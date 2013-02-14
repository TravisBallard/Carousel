<html>
    <head>
        <title>Carousel Example</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <script src="jquery-1.8.3.js"></script>
        <script src="script.js"></script>
    </head>
    <body>
        <div id="carousel-wrap">
            <a href="javascript://" class="carousel-left"><</a>
            <a href="javascript://" class="carousel-right">></a>
            <div id="mask">
                <ul id="carousel">
                    <?php
                        $color_classes = array( 'orange', 'green', 'teal', 'purple' );

                        for( $x = 0; $x <= 9; $x++ )
                            printf( '<li class="carousel-item %s">%d</li>', $color_classes[ $x % count( $color_classes ) ], $x + 1 );
                    ?>
                </ul>
            </div>
        </div>
    </body>
</html>
