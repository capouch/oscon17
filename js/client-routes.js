// Stub file which will soon hold client-side routes

<IndexRoute name ="home" component = { Home } />
<Route path = "browse" component = { Browse } />
<Route path = "edit/:imageId" component = { Edit } />
<Route path = "zoomer" component = { Zoom } />
<Route path = "zoomer/:imageId" component = { Zoom }/>
<Route path = "upload" component = { Upload } />
<Route path = "slides" component = { SlideShow } />
<Route path = "slides/:viewSet" component = { SlideShow } />
<Route path = "*" component = { Home } />
</Route>
