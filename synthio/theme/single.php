<?php get_header(); ?>
<?php if (have_posts()) : ?>
<?php while (have_posts()) : the_post(); ?>
<?php get_template_part( 'title' ); ?>


	<div class="qodef-container">
		<?php do_action('qode_startit_after_container_open'); ?>
		<div class="qodef-container-inner">
  		
    <?php  
      if ($showHeader = 1) {

        global $post;
        $oldpost = $post;
        
        //  Load the blog for the page
        $page_for_posts = get_option( 'page_for_posts' );
        $post = get_post($page_for_posts);
        
        if(have_rows('flexible_content')) {
            while(have_rows('flexible_content')) {
                the_row();
                get_template_part('flexible-content/block', get_row_layout());
            }
        }
        $post = $oldpost;
      }
    ?>
  		
			<?php qode_startit_get_blog_single(); ?>
		</div>
		<?php do_action('qode_startit_before_container_close'); ?>
	</div>
<?php endwhile; ?>
<?php endif; ?>
<?php get_footer(); ?>