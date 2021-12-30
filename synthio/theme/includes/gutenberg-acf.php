<?php
	
function my_synthio_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'flexible-content',
				'title' => __( 'Flexible Content Blocks', 'flexible-content' ),
				'icon'	=> 'admin-settings',				
			),
		)
	);
}
add_filter( 'block_categories', 'my_synthio_block_category', 10, 2);
	
add_action('acf/init', 'my_acf_init');
function my_acf_init() {
	
	// check function exists
	if( function_exists('acf_register_block') ) {
		// register hero block
		acf_register_block(array(
			'name'				=> 'hero',
			'title'				=> __('Hero Banner'),
			'description'		=> __('Flexible hero area - typically should only be used at top of page.'),
			'render_callback'	=> 'acf_block_render_callback',
			'category'			=> 'flexible-content',
			'icon'				=> 'admin-settings',
			'mode' => 'edit',
			'keywords'			=> array( 'hero', 'banner' ),
		));

		acf_register_block(array(
			'name'				=> 'text-content',
			'title'				=> __('Content Container'),
			'description'		=> __('Content box with ability to add CSS classes etc. NOTE: generally, you will want to just use regular blocks rather than the content container block.'),
			'render_callback'	=> 'acf_block_render_callback',
			'category'			=> 'flexible-content',
			'icon'				=> 'admin-settings',
			'mode' => 'edit',
			'keywords'			=> array( 'wysiwyg', 'editor' ),
		));

		acf_register_block(array(
			'name'				=> 'icon-list',
			'title'				=> __('Icon list'),
			'description'		=> __('A list of key features, with associated icons from FontAwesome'),
			'render_callback'	=> 'acf_block_render_callback',
			'category'			=> 'flexible-content',
			'icon'				=> 'admin-settings',
			'mode' => 'edit',
			'keywords'			=> array( 'icons', 'solutions', 'features' ),
		));

		acf_register_block(array(
			'name'				=> 'features',
			'title'				=> __('Features Listing'),
			'description'		=> __('Simple list of features with associated icon'),
			'render_callback'	=> 'acf_block_render_callback',
			'category'			=> 'flexible-content',
			'icon'				=> 'admin-settings',
			'mode' => 'edit',
			'keywords'			=> array( 'icons', 'list' ),
		));

		acf_register_block(array(
			'name'				=> 'teaser-grid',
			'title'				=> __('Teaser Grid'),
			'description'		=> __('Show "teasers" for other content items'),
			'render_callback'	=> 'acf_block_render_callback',
			'category'			=> 'flexible-content',
			'icon'				=> 'admin-settings',
			'mode' => 'edit',
			'keywords'			=> array( 'solutions', 'features' ),
		));
		
		acf_register_block(array(
			'name'				=> 'portfolio-view',
			'title'				=> __('Portfolio View'),
			'description'		=> __('Show items based on tags in a portfolio view'),
			'render_callback'	=> 'acf_block_render_callback',
			'category'			=> 'flexible-content',
			'icon'				=> 'admin-settings',
			'mode' => 'edit',
			'keywords'			=> array( 'solutions', 'features', 'thumbnails' ),
		));
		
				
	}
}

function acf_block_render_callback( $block ) {
	
	$slug = str_replace('acf/', '', $block['name']);
	// include a template part from within the "template-parts/block" folder
	if( file_exists( get_theme_file_path("/flexible-content/block-{$slug}.php") ) ) {
		include( get_theme_file_path("/flexible-content/block-{$slug}.php") );
	} else {
  	print "No content added yet";
	}
}

?>