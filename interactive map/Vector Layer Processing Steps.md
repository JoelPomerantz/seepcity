# Vector Layer Processing Steps
The steps below describe how to take a raster layer from photoshop, turn it into accurately georeferenced vector geometry, and add it to the Seep City Mapbox style.

**In Illustrator:**
_Joel: These are the steps you sent me back in June for how you created the Illustrator files. Let me know if you are doing things any differently now._

![](Vector%20Layer%20Processing%20Steps/Screen%20Shot%202017-01-19%20at%203.33.02%20PM.png)

The way that Joel is currently doing the conversion from raster to vector results in duplicate vector paths that need to be removed for successful export to DXF.
	* _Can we figure out how to convert to vector paths without duplicate paths?_
	
In order to import the files into QGIS, they need to be saved as DXF files (AutoCAD interchange files).
	
* Open the layer .ai file
* Go to Object > Artboards > Fit to Artwork Bounds
	* _Actions can can be used to automate this step for multiple files_
* Go to Select > All, or click once anywhere on the artwork to select all paths (all paths should be grouped initially)
* Go to Object > Ungroup to remove the top-level path grouping
* Click once on the artwork to select the top layer of paths, which includes duplicate shapes and a path extracted from the extent of the original map layer
	* Press Delete to remove these unnecessary paths
* Go to File > Export and select AutoCAD Interchange File (dxf) as the export format
	* The default export settings should be fine
	* Actions can be used to batch export multiple files

**In QGIS:**
* Open  `vector_transform.qgs`  from Data > Georeferencing
	* _Could set up a QGIS project with a few settings ready to go for georeferencing, otherwise just create a new project_
* Make sure the GRASS geoprocessing plugin is installed
	* Go to Plugins > Manage and Install Plugins to view installed plugins and add new ones
* To show the processing toolbox, go to Processing > Toolbox
	* With Advanced Interface selected at the bottom of the toolbox, the GRASS geoprocessing tools should be visible
* Go to Layer > Add Layer > Add Vector Layer and choose the DXF file(s)
* When prompted to select CRS for the layer source, choose EPSG:3857 (WGS 84 / Pseudo Mercator)
* When prompted to select which geometry types to import, choose the Polygon layer (do not select LineString layer)
* When prompted to select a CRS for the imported layer, choose EPSG:3857 (WGS 84 / Pseudo Mercator)
* If georeferencing one layer:
	* In the Processing Toolbox, under GRASS commands > Vector, select v.transform.pointsfile
	* Choose the DXF layer you just imported as the input layer
	* For the points file, browse to Data > Georeferencing > `vector_transform.points`
	* Under Transformed, click the browse button and choose Save to file
	* Browse to the appropriate folder (transformed shapefiles are currently in Data > Shapefiles > Transformed Raster Layers) and give the layer an appropriate name
	* Keep ‘Open output file after running algorithm’ checked
	* Click Run to execute the algorithm. If all goes well, the transformed shapefile should show up in the layers panel.
	* Right click the layer and select ‘Zoom to Layer’
	* The layer should now be positioned correctly relative to the basemap
	* Remove any geometry that was included only for georeferencing purposes
* If georeferencing a batch of layers:
	* _QGIS has a batch processing feature, which will be outlined here if necessary_
	* 	_Way to auto name layers?_
	* _Might be able to batch process shape files without actually adding them as layers_
	* _The whole QGIS process could also be automated with a python script down the road if it ever seems worth it_

**In Mapbox Studio:**

	
