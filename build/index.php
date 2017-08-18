<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="styles.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,700|Playfair+Display" rel="stylesheet">
        <title>Our Gainesville</title>

        <!-- Google Analytics -->
        <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-746001-8', 'auto');
        ga('send', 'pageview');
        </script>
        <!-- End Google Analytics -->


        <!-- Custom Meta Tags By Story Slug -->
        <?php
            // default value
            $home = 'our-gainesville';

            // metadata for each story
            $metadata = array(
                "our-gainesville" => array(
                    "title" => "Our Gainesville",
                    "description" => "Individual stories of the people living, working, praying, performing and more in Gainesville.",
                    "image" => "https://www.wuft.org/news/files/2017/08/OurGainesvilleCover.jpg"
                ),
                "its-a-cade-thing" => array(
                    "title" => "It's A Cade Thing",
                    "description" => "Lorem ipsum.",
                    "image" => "https://www.wuft.org/news/files/2017/07/IMG_0691.jpg"
                ),
            );

            // get the slug from the url paramater or default to the $home value
            $slug = $_GET['s'];
            if(!$slug or !array_key_exists($slug, $metadata))
                $slug = $home;

        ?>
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@WUFTNews">
        <meta name="twitter:creator" content="@WUFTNews">
        <meta name="twitter:title" content="<?php echo $metadata[$slug]['title'] ?>">
        <meta name="twitter:description" content="<?php echo $metadata[$slug]['description'] ?>">
        <meta name="twitter:image" content="<?php echo $metadata[$slug]['image'] ?>">
        <meta name="Description" content="<?php echo $metadata[$slug]['description'] ?>">
        <meta property="og:description" content="<?php echo $metadata[$slug]['description'] ?>">
        <!-- End Custom Meta Tags -->
    </head>
    <body>
        <div id="wuft-banner"><h3><a href="https://wuft.org/news">WUFT News &nbsp;|&nbsp; SPECIAL REPORT</a></h3></div>
        <script src="longform-template.min.js"></script>
        <script src="scripts.min.js"></script>
        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-58d18b4ee57abebe"></script>
    </body>
</html>
