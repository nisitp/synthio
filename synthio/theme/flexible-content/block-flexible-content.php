<?php
/**
 * Container for other flexible content. This should eventually be replaced by just using gutenberg editor directly but is here for backward compatibility.
 */

if(have_rows('flexible_content')) {
    while(have_rows('flexible_content')) {
        the_row();
        get_template_part('flexible-content/block', get_row_layout());
    }
}