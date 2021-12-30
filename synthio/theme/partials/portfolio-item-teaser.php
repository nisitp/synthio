<?php 
  $categories = get_the_terms($post, 'portfolio-category'); 
  
  $meta = get_post_meta($post->ID);

  $link = count($meta['portfolio_external_link']) ? $meta['portfolio_external_link'][0] : get_the_permalink(); 

  $has_excerpt = 0;
  
  // get_the_excerpt is pretty broken so just using value from $post
//  $e = strip_tags(get_the_excerpt($post));

  $e = $post->post_excerpt;

  if (strlen($e) and $e != "TBD") $has_excerpt = 1;
  
  // we only want the top-level category
  foreach ($categories as $cat) {
    if ($cat->parent == 0) {
      $category = $cat->name;
      break;
    }
  }
  
  // if there was no top-level category, use the first tag instead.  
  if (!$category) $category = $categories[0]->name;
  
  // RISKY - trimming the last "s". Will need to fix if we add categories that end in 's'.
  if ($category == "Case Studies") {  
    $category = "Case Study";
    $categorylc = strtolower($category);
  }  elseif (substr($category,-1) == "s") {
    $category = substr($category,0, -1);
    $categorylc = strtolower($category);
    
  }
  
  $img = get_the_post_thumbnail_url();
?>
<div <?php if ($img) print "style='background-image:url($img)'"; ?> class="teaser portfolio-item portfolio-item--teaser portfolio-<?php print $categorylc;?>">
  <a href="<?php print $link; ?>">  
  <div class="portfolio-item--teaser--inner">
    <div class="portfolio-item-category"><?php print $category;?></div>
    
      <p class="portfolio-item-title"><?php print the_title(); ?></p>
      
      <div class="portfolio-item--image">
        <?php print the_post_thumbnail(); ?>
      </div>    
      <?php if ($has_excerpt): ?>
      <div class="excerpt portfolio-item--teaser--excerpt">
        <?php print the_excerpt(); ?>
      </div>
      <?php endif; ?>
    </div>
  </a>  
</div>