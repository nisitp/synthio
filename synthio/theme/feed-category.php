<?php
/*
Template Name: Feed Template
*/
?>
<?php get_header(); ?>
<?php get_template_part( 'title' ); ?>
<div class="qodef-container">
    <?php do_action('qode_startit_after_container_open'); ?>
    <div class="qodef-container-inner" >
        <div class="feed-category-item"><?php the_content(); ?></div>
    </div>
    <?php do_action('qode_startit_before_container_close'); ?></div>
</div>
<?php get_footer(); ?>