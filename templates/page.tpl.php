<header id="header">
  <div class="container">
    <?php print render($page['header']); ?>  
  </div>  
</header>

<div id="slider">
  <div class="container">
    <?php print render($page['slider']); ?>
  </div>   
</div>

<div class="container">
  <div id="page">
    <?php if ($page['sidebar_first']): ?><div id="sidebar-first"><?php print render($page['sidebar_first']); ?></div><?php endif; ?>   
    <div id="wrapper">
      <?php if ($breadcrumb): print $breadcrumb; endif;?>    
      <?php print $messages; ?>
      <?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper"><?php print render($tabs); ?></div><?php endif; ?>
      <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
      <main id="main">
        <?php if ($title): ?><h1 class="page-title"><?php print $title; ?></h1><?php endif; ?> 
        <div id="content"> 
          <?php print render($page['content']); ?>
          <?php if ($page['sidebar_second']): ?><div id="sidebar-second"><?php print render($page['sidebar_second']); ?></div><?php endif; ?>
        </div>
      </main>
    </div>   
  </div>  
</div> 

<?php if ($page['content_bottom']): ?>
  <div class="container">
    <div id="bottom">
      <?php print render($page['content_bottom']); ?>    
    </div>   
  </div>
<?php endif; ?>

<div id="logos">
  <div class="container">
    <?php print render($page['logos']) ?>
  </div>   
</div>

<footer id="footer">
  <div class="container">
    <?php print render($page['footer']) ?>
  </div>
</footer>

<div id="mobile-panel">
  <?php print render($page['mobile_panel']) ?>
</div>