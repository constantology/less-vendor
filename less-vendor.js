var less      = require ( 'less' ),
	functions = function() {
		var prefixes  = '-moz- -ms- -o- -webkit-'.split( ' ' ),
			re_vendor = /-vendor-/gim;

		return {
			prefix   : function( prop, attr, value_vendor, value_unprefixed ) {
				prop             = prop.value
				attr             = attr.value;
				value_vendor     = value_vendor     && value_vendor.value     ? '( ' + value_vendor.value     + ' );\n' : ';\n';
				value_unprefixed = value_unprefixed && value_unprefixed.value ? '( ' + value_unprefixed.value + ' );\n' : value_vendor;

				var parts = prefixes.reduce( function( accumulator, prefix ) {
					accumulator.push( prefix, attr, value_vendor, prop + ' : ' );
					return accumulator;
				}, [] );

				parts.push( attr, value_unprefixed );

				return new less.tree.Anonymous( parts.join( '' ) );
			},
			property : function( prop, value, delim ) {
				prop = prop.value; value = value.value;

				if ( Array.isArray( value ) ) {
					value = value.map( function( v ) {
						return v.unit ? v.value + v.unit : v.value;
					} );
					delim = delim ? delim.value : ' ';
					value = value.join( delim );
				}

				value = String( value );

				var parts = prefixes.reduce( function( accumulator, prefix ) {
					accumulator.push( prefix, prop, ' : ', value.replace( re_vendor, prefix ), ';\n' );
					return accumulator;
				}, ['__less__;\n'] );

				parts.push( prop, ' : ', value.replace( re_vendor, '' ), ';\n' );

				return new less.tree.Anonymous( parts.join( '' ) );
			}
		}
	}();

less.tree.functions.prefix   = functions.prefix;
less.tree.functions.property = functions.property;
less._Parser                 = less.Parser;
less.Parser                  = function( env ) {
	var p = less._Parser.apply( Object.create( less._Parser.prototype ), arguments );

	p._parse = p.parse;
	p.parse  = function( data, cb ) {
		this._parse( data, function( err, root ) {
			if ( !err ) {
				root._toCSS = root.toCSS;
				root.toCSS  = function( evaluate ) {
					return root._toCSS( evaluate ).replace( /__vendor__[^\:]*:[^;]*;/gim, '' ).replace( /;[\s]*;/gim, ';' );
				};
			}

			return cb( err, root );
		} );
	};

	return p;
}
module.exports = less;
