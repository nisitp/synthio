<?php
/**
 * Template Name: Flexible Content
 */

get_header('new');

if(have_rows('flexible_content')) {
    while(have_rows('flexible_content')) {
        the_row();
        get_template_part('flexible-content/block', get_row_layout());
    }
}

get_footer();
