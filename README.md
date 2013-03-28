# less-vendor
 <!--[![build status](https://secure.travis-ci.org/constantology/less-vendor.png)](http://travis-ci.org/constantology/less-vendor)-->

 hacky module to make nice with not needing a **god damn** mixin for every **god damn** vendor prefixed property!

 ## IMPORTANT

 This is totally **not tested!**

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
