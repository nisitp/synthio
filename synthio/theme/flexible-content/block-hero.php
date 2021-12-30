<?php

// how we get the fields depends on whether we're in a 'flexible content' block or direct (i.e. via gutenberg editor)  
if (get_field('flexible_content')) {
  $function = 'get_sub_field';
} else {
  $function = 'get_field';
}

$image = $function('image');
$background = $function('background');

$style = $background['type'] == 'image' && strlen($background['image'])
    ? "background-image: url('".esc_attr($background['image'])."');"
    : "";

$hcontent = $function('hero_content');
$button = $function('button');
$button['link'] = $button['link']['link_to'] == 'internal'
    ? get_permalink($button['link']['link'])
    : $button['link']['link'];

$featured_content = $function('featured_content');

$featured_content_image = isset($featured_content['content']) && $featured_content['content'][0]['image'];

$classes .= $featured_content['enable'] ? 'fc-hero--with-featured-content' : '';
$classes .= strlen($image['url']) ? 'fc-hero--with-main-image' : '';

?>
<section class="fc-hero <?php print $block['className'] ? $block['className'] . " " : "";?><?php print $classes; ?>" style="<?php print $style; ?>">
  <div class="fc-hero__inner">
    <?php if($background['type'] == 'video'): ?>
        <div class="fc-hero__video-container">
            <div class="fc-hero__video-overlay"></div>
            <video class="fc-hero__video" autoplay muted loop>
                <source src="<?php print esc_attr($background['video']); ?>" type="video/mp4">
            </video>
        </div>
    <?php endif; ?>

    <?php if(strlen($image['url'])): ?>
      <div class="fc-hero__main-image">
        <img src='<?php print $image['url'];?>' alt='<?php print $image['alt'];?>' />
      </div>
    <?php endif; ?> 
    
    <?php if (sizeof($featured_content)) { ?><div class="fc-hero__main-content"> <?php } ?>
    
    
    <h1 class="fc-hero__headline"><?php print $function('headline'); ?></h1>
      <div class="fc-hero__content"><?php print $hcontent; ?></div>
    <?php if($button['enable']): ?>
        <a class="fc-hero__button" href="<?php print esc_attr($button['link']); ?>"><?php print esc_html($button['text']); ?></a>
    <?php endif; ?>
    <?php if (sizeof($featured_content)) { ?></div><?php } ?>
    
    <?php if($featured_content['enable']): ?>  
      <div class="fc-hero__detail">
          <div class="fc-hero__detail-inner">
              <?php foreach($featured_content['content'] as $content): ?>
  
                  <?php if($featured_content_image): ?>
                      <div class="fc-hero__feature fc-hero__feature--image">
                          <img class="fc-hero__feature-image" src="<?php print esc_attr($content['image']); ?>" alt="<?php print esc_attr($content['title']); ?>">
                      </div>
                  <?php endif; ?>
                  <div class="fc-hero__feature <?php print $featured_content_image ? 'fc-hero__feature--with-image' : ''; ?>">
                    <?php if ($content['title']): ?>
                      <h3 class="fc-hero__feature-title"><?php print $content['title']; ?></h3>
                    <?php endif; ?>
                      <div class="fc-hero__feature-desc">
                        <?php print $content['description']; ?>
                      </div>
                  </div>
              <?php endforeach; ?>
          </div>
      </div>
    <?php endif; ?>
  </div>
</section>
