<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, target-densityDpi=device-dpi">
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
                    "description" => "A community-engagement project highlighting the diverse stories and lives of the people who call Gainesville, Florida home.",
                    "image" => "https://www.wuft.org/news/files/2017/08/OurGainesvilleCover.jpg"
                ),
                "its-a-cade-thing" => array(
                    "title" => "It's A Cade Thing",
                    "description" => "For Phoebe Miles, Gainesville's story of innovation starts with her father.",
                    "image" => "https://www.wuft.org/news/files/2017/07/IMG_0691.jpg"
                ),
                "without-limits" => array(
                    "title" => "Without Limits",
                    "description" => "Thousands of miles from home, a 48-year-old finds her purpose in a sorority.",
                    "image" => "https://www.wuft.org/news/files/2017/07/Concessa16-1.jpg"
                ),
                "city-streets-to-center-stage" => array(
                    "title" => "City Streets To Center Stage",
                    "description" => "Hippodrome Musical Director rises from rock bottom.",
                    "image" => "https://www.wuft.org/news/files/2017/07/Mercer6.jpg"
                ),
                "teaching-a-beat" => array(
                    "title" => "Teaching A Beat",
                    "description" => "A love of music, and a left turn, brought Sidney Lanier music director to a life-changing crossroad.",
                    "image" => "https://www.wuft.org/news/files/2017/08/don-w-student-at-lanier-1.jpg"
                ),
                "in-the-moments" => array(
                    "title" => "In The Moments",
                    "description" => "In tune with the &#34;pulls&#34;, Less Than Jake drummer is on a journey to create lasting memories.",
                    "image" => "https://www.wuft.org/news/files/2017/08/E0.jpg"
                ),
                "a-cuban-renaissance" => array(
                    "title" => "A Cuban Renaissance",
                    "description" => "Cuban photographer makes up for lost time with Bulla Cubana.",
                    "image" => "https://www.wuft.org/news/files/2017/07/Cuba_Iphone06_17_Tyler_Exhibition_-41.jpg"
                ),
                "redefining-her-story" => array(
                    "title" => "Redefining Her Story",
                    "description" => "Coming out the second time meant she no longer had to lie to herself.",
                    "image" => "https://www.wuft.org/news/files/2017/08/Melinapic7230.jpg"
                ),
                "a-hard-thing-to-silence" => array(
                    "title" => "A Hard Thing To Silence",
                    "description" => "Fighting racism and segregation, a nurse and young mother broke down barriers to equal healthcare.",
                    "image" => "https://www.wuft.org/news/files/2017/07/Vivian-Filer-0004-copy-1.jpg"
                ),
                "behind-the-bar" => array(
                    "title" => "Behind The Bar",
                    "description" => "Lillian's bartender brings The Tom Show home to happy hour.",
                    "image" => "https://www.wuft.org/news/files/2017/07/TomBlakePhotoStoryChrisWatkins-3-1.jpg"
                ),
                "love-your-neighbor" => array(
                    "title" => "Love Your Neighbor",
                    "description" => "After decades of loss, the &#34;mayor of Linton Oaks&#34; finds purpose through service.",
                    "image" => "https://www.wuft.org/news/files/2017/08/cover.jpg"
                ),
                "up-in-the-trees" => array(
                    "title" => "Up In The Trees",
                    "description" => "Honoring his college roommate, Gainesville tree farmer dedicates his life to cultivating the canopy.",
                    "image" => "https://www.wuft.org/news/files/2017/08/GeneL18.jpg"
                ),
                "soldier-for-country-and-community" => array(
                    "title" => "Soldier For Country & Community",
                    "description" => "Iwo Jima survivor brings lessons from the battlefield to the classroom.",
                    "image" => "https://www.wuft.org/news/files/2017/07/Gasche_headline.jpg"
                ),
                "a-life-of-resistance" => array(
                    "title" => "A Life Of Resistance",
                    "description" => "Gainesville grandmother still has the fight in her for human rights.",
                    "image" => "https://www.wuft.org/news/files/2017/08/Headline-banner-photo.jpg"
                ),
            );

            // get the slug from the url paramater or default to the $home value
            $slug = $_GET['s'];
            if(!$slug or !array_key_exists($slug, $metadata))
                $slug = $home;

        ?>
        <!-- End Custom Meta Tags -->
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
