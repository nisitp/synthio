<?php
	// how we get the fields depends on whether we're in a 'flexible content' block or direct (i.e. via gutenberg editor)  
	if (get_field('flexible_content')) {
	  $function = 'get_sub_field';
	} else {
	  $function = 'get_field';
	}
	
	 $addClass = " " . $function('class'); ?>

<section class="fc-text-content <?php print $block['className'] ? $block['className'] . " " : "";?>">
    <div class="fc-text-content__container">
        <div class="fc-text-content__inner">
            <?php if($function('headline')): ?>
                <h2 class="fc-text-content__title"><?php print $function('headline'); ?></h2>
            <?php endif; ?>
            <?php if($function('content')): ?>
                <div class="fc-text-content__content" style="column-count: <?php print esc_attr($function('columns')); ?>">
                    <?php print $function('content'); ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>
