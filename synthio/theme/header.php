<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <?php qode_startit_wp_title(); ?>
    <?php
    /**
     * @see qode_startit_header_meta() - hooked with 10
     * @see qode_user_scalable - hooked with 10
     */
    ?>
	<?php do_action('qode_startit_header_meta'); ?>

	<?php wp_head(); ?>
	<script src="//app-ab26.marketo.com/js/forms2/js/forms2.min.js"></script>

</head>
<?php 
//  print "<pre>"; print_r($post); exit;

$hasHero = 0;
$classes = [];

if (is_home() || is_archive() || is_singular('post') || is_singular('portfolio-item')) {
  // actually used for if it's the blog page because WordPress.
  $hasHero = 1;
	$classes[] = "with-hero";  
}
	
if ( has_blocks( $post->post_content ) ) {
	$blocks = parse_blocks( $post->post_content );
	if ($blocks[0]["blockName"] == "acf/hero") {
		$hasHero = 1;
		$classes[] = "with-hero";
	}
}

if ( ! is_front_page() ) $classes[] = "not-home";

?>	
<body <?php body_class($classes); ?>>
<?php qode_startit_get_side_area(); ?>

<div class="qodef-wrapper">
    <div class="qodef-wrapper-inner">
        <?php qode_startit_get_header(); ?>

        <?php if(qode_startit_options()->getOptionValue('show_back_button') == "yes") { ?>
            <a id='qodef-back-to-top'  href='#'>
                <span class="qodef-icon-stack">
                     <?php
                        qode_startit_icon_collections()->getBackToTopIcon('font_awesome');
                    ?>
                </span>
            </a>
        <?php } ?>
        <?php qode_startit_get_full_screen_menu(); ?>

        <div class="qodef-content" <?php qode_startit_content_elem_style_attr(); ?>>
 <div class="qodef-content-inner qodef-container-inner">
   
<?php if (! $hasHero && !is_404()) {
	 the_title( '<h1 class="entry-title">', '</h1>' ); 
}

if (is_404()) {
	print "<h1 class='entry-title'>Page Not Found</h1>";
}
?>
   
