<?php 

  // how we get the fields depends on whether we're in a 'flexible content' block or direct (i.e. via gutenberg editor)  
  if (get_field('flexible_content')) {
    $function = 'get_sub_field';
  } else {
    $function = 'get_field';
  }
	
	
  $features = $function('features'); 
  $featureCount = count($features);
  $addClass = $function('class');
  $addClass .= ' ' . $block['className'];
  
?><section class="fc-features fc-features-<?php print $featureCount;?>-items <?php print $addClass; ?>">  
    <?php foreach($features as $feature): ?>
    <div class="fc-features--feature <?php print $feature['feature_icon'] ? "with-icon" . " " : "";?>">
      <div class="fc-features--feature--inner">
      <?php if($img = $feature["feature_icon"]): ?>
        <div class="fc-features--feature--icon-container">
          <img class="fc-features--feature--icon" alt="<?php print $img["alt"];?>" src="<?php print $img["url"]; ?>" />
        </div>
      <?php endif; ?>
	    <?php if($headline = $feature["feature_headline"]): ?>
	        <h3 class="fc-features--feature__title"><?php print $headline; ?></h3>
	    <?php endif; ?>
	    <?php if($content = $feature['feature_content']): ?>
	        <div class="fc-features--feature__content">
	            <?php print $content; ?>
	        </div>
	    <?php endif; ?>
      </div>
    </div>
    <?php endforeach; ?>
</section>
