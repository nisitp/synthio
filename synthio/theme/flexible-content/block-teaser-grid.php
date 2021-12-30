<?php 
  // quick hack for looping
  global $post;
  $oldpost = $post;
  
// how we get the fields depends on whether we're in a 'flexible content' block or direct (i.e. via gutenberg editor)  
if (get_field('flexible_content')) {
  $function = 'get_sub_field';
} else {
  $function = 'get_field';
}

?>

<?php $addClass = $function('css_class')['class'];?>
<section class="fc-teaser-grid <?php print $block['className'] ? $block['className'] . " " : "";?><?php print $addClass;?>">
  <?php if($function('headline')): ?>
      <h2 class="fc-teaser-grid__title"><?php print $function('headline'); ?></h2>
  <?php endif; ?>
  <div class="fc-teaser-grid__items">
    <?php foreach($function('items') as $i => $post): ?>
    <div class="fc-teaser-grid--row">
      <?php get_template_part('partials/'.$post->post_type, 'teaser'); ?>
    </div>

	<?php wp_reset_postdata(); ?>
    
    <?php endforeach; ?>
  </div>
</section>
<?php // reset post
  $post = $oldpost;
?>