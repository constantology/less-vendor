# less-vendor

hacky module to make nice with not needing a **god damn** mixin for every **god damn** vendor prefixed property.

## IMPORTANT NOTES

- This is totally **not tested!**
- The `__vendor__` crud will not be present in your compiled CSS, for now it's a necessary evil.
- the less parser doesn't give you the property being parsed which is why you need to duplicate the property name when using [vendor prefix values](#vendor-prefix-values) function.
- there are no checks for supported prefixes, `-[moz|ms|o|webkit]-` prefixes will be created indiscriminately.
- if you got a better solution — for doing this using less css, not sass, stylus or any other pre-compiler — let me know and I'll kill this repo and use that instead.

## installation and usage

### install

``` shell

    npm install -g less-vendor

```

### use

``` shell

    lessv "PATH/TO.less" "PATH/TO.css"

```

it's pretty much a straight out rip of the `lessc` CLI program, so the same options apply.

`lessv` will display the same help options as `lessc`.

## vendor prefix properties

``` css

    .selector {
       __vendor__ : property( transition, all 400ms ease-in-out );
       }

```

generates

``` css

    .selector {
           -moz-transition    : all 400ms ease-in-out;
           -ms-transition     : all 400ms ease-in-out;
           -o-transition      : all 400ms ease-in-out;
           -webkit-transition : all 400ms ease-in-out;
       transition : all 400ms ease-in-out;
       }

```

## vendor prefix values

``` css

    .selector {
       background-image : prefix( background-image, linear-gradient, e( "180deg, #000 0%, #fff 100%" )  );
       }

```

generates

``` css

    .selector {
           background-image : -moz-linear-gradient( 180deg, #000 0%, #fff 100% );
           background-image : -ms-linear-gradient( 180deg, #000 0%, #fff 100% );
           background-image : -o-linear-gradient( 180deg, #000 0%, #fff 100% );
           background-image : -webkit-linear-gradient( 180deg, #000 0%, #fff 100% );
       background-image : linear-gradient( 180deg, #000 0%, #fff 100% );
       }

```

## vendor combo type stuff

``` css

    .selector {
       __vendor__ : property( transition, e( "-vendor-transform 400ms ease-in-out" ) );
       }

```

generates

``` css

    .selector {
           -moz-transition    : -moz-transform 400ms ease-in-out;
           -ms-transition     : -ms-transform 400ms ease-in-out;
           -o-transition      : -o-transform 400ms ease-in-out;
           -webkit-transition : -webkit-transform 400ms ease-in-out;
       transition : transform 400ms ease-in-out;
       }

```
