<?php
  // how we get the fields depends on whether we're in a 'flexible content' block or direct (i.e. via gutenberg editor)  
  if (get_field('flexible_content')) {
    $function = 'get_sub_field';
  } else {
    $function = 'get_field';
  }

$vertical = $function('layout') == 'vertical';
?>
<section class="fc-icon-list <?php print $block['className'] ? $block['className'] . " " : "";?>fc-icon-list--<?php print $function('background_color'); ?>">
    <div class="fc-icon-list__container">
        <div class="fc-icon-list__inner">
          <?php if ($function('description') != ''):?>
            <p class="fc-icon-list__desc"><?php print $function('description'); ?></p>
          <?php endif; ?>
            <div class="fc-icon-list__solutions">
                <?php foreach($function('items') as $icon):
                        $icon['link'] = flexible_content_helper_link($icon['link']); ?>
                    <<?php echo $icon['link'] ? 'a' : 'div'; ?> class="fc-icon-list__solution <?php print $vertical ? " fc-icon-list__solution--vertical" : ""; ?>"<?php print $icon['link'] ? ' href="'.esc_attr($icon['link']).'"' : ''; ?>>
                        <?php if($icon['icon']): ?><div class="fc-icon-list__solution-icon"><span class="fa <?php print esc_attr($icon['icon']); ?>"></span></div><?php endif; ?>
                        <span class="fc-icon-list__solution-desc"><?php print $icon['title']; ?></span>
                        <?php if($icon['description']) print "<div class='fc-icon-list__solution--detail'>".$icon['description'] . '</div>'; ?>
                        </p>
                    </<?php echo $icon['link'] ? 'a' : 'div'; ?>>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>
