<?php
get_header();

?>

<section class="fc-hero " style="background-image: url('https://synthio.dev/wp-content/uploads/2019/03/banner-abstract-binary.jpg');">
  <div class="fc-hero__inner">
        <div class="fc-hero__main-content">     
    <h1 class="fc-hero__headline">Resources</h1>
      <div class="fc-hero__content"><h2 style="font-family: inherit;"><?php the_title();?></h2>
</div>
        </div>    
      </div>
</section>

<?php
// get_template_part('title');
// get_template_part('slider');
// qode_startit_single_portfolio();

// Hot Sauce adds
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package excel_health
 */

/*
$types = get_terms([
    'taxonomy' => 'eh_resource_type',
    'hide_empty' => false,
]);

$type = wp_get_post_terms($post->ID, 'eh_resource_type');
$type = sizeof($type) > 0 ? $type[0]->name : "Unknown";

*/
$linkType = get_field('resource_display_type', $post->ID);
$linkClass = "";
$link = get_permalink($post->ID);

if($linkType == 'iframe') {
  // generate the download message
  switch ($type) {
    case "Webinar":
      $iframemsg = "watch the Webinar";
      break;
    default:
      $iframemsg = "download the PDF";
      break;
  }
} else if ($linkType == 'file') {
    $link = get_field('resource_file', $post->ID);
} else if ($linkType == 'link') {
    $link = get_field('resource_link', $post->ID);
}

?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

		<?php
			the_content();
    ?>
		
    <div class="resource-type"><?php print $type; ?></div>
    <!-- div class="resource__image">
        <a class="<?php print esc_attr($linkClass); ?>" href="<?php print esc_attr($link); ?>"><img src="<?php print esc_attr(get_field('resource_image', $post->ID)); ?>" alt="<?php print esc_attr($post->post_title); ?>" /></a>
    </div -->
    
    <div class="resource-excerpt">
        <?php print get_field('resource_text', $post->ID); ?>
    </div>
      
      <?php if($linkType == 'iframe'): ?>
        <div class="resource-form">  
            <p>Fill out the form below to <?php print $iframemsg; ?></p>
            <?php echo get_field('resource_iframe', $resource->ID); ?>
        </div>
      <?php elseif ($linkType == 'gated'):    
        
        if ($_GET["success"] == "true" || $_GET["id"]) {
          // check the nonce                    

          // allow overriding if we're on the thank-you page.  (Note - this will allow bypassing the form but is per client request)            
          if ($_GET["id"] == get_the_ID() || ($_GET["a"] == $post->ID && wp_verify_nonce($_GET["n"], "gated_download-" . $_GET["i"] . "-" . $_GET["a"]))) {
            $verified = 1;
            
            $link = get_field('resource_link', $post->ID);
            if (strlen($link)) {
              wp_redirect($link);exit;
            } else {
              print get_field('thankyou', $post->ID);
            }

            if ($dlfile = get_field('resource_file', $post->ID)):
            ?>
            <p>
              <a href='<?php echo $dlfile; ?>'>Download "<?php print get_the_title();?>"</a>
            </p>
            <?php
            endif;
            
          }  else {
            $verified = 0;
          }
          
        } 
        
        if (!$verified) {
          // create a nonce for verifying against
          $fileid = get_field('resource_file', $post->ID, false); 
          $nonce = wp_create_nonce("gated_download-" . $fileid . "-" . $post->ID);
        ?>
        
        <form data-submit-text="<?php echo get_field('resource_link_text');?>" data-nonce="<?php echo $nonce; ?>" data-media="<?php echo $fileid; ?>" data-assetid="<?php echo the_ID(); ?>" data-formid="<?php echo get_field('marketo_form_id');?>" class="marketo-form gated" id="mktoForm_<?php echo get_field('marketo_form_id');?>"></form>      
        
        <?php
          } // end if success
      endif; // end if gated
       ?>
    </div>
	<?php if ( get_edit_post_link() ) : ?>
		<footer class="entry-footer">
			<?php
				edit_post_link(
					sprintf(
						/* translators: %s: Name of current post */
						esc_html__( 'Edit %s', 'excel-health' ),
						the_title( '<span class="screen-reader-text">"', '"</span>', false )
					),
					'<span class="edit-link">',
					'</span>'
				);
			?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>
</article><!-- #post-## -->


<?php 
// END HS
get_footer();

?>
