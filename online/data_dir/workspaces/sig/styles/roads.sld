<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
                       xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
                       xmlns="http://www.opengis.net/sld" 
                       xmlns:ogc="http://www.opengis.net/ogc" 
                       xmlns:xlink="http://www.w3.org/1999/xlink" 
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <!-- a named layer is the basic building block of an sld document -->

  <NamedLayer>
    <Name>Roads Line</Name>
    <UserStyle>
      <!-- they have names, titles and abstracts -->

      <Title>A boring default style</Title>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- a feature type for lines -->

      <!-- start Motorway -->
      <FeatureTypeStyle>
        <Rule>
          <Name>Motorway</Name>
          <Title>Motorway Line zoom 1</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>motorways</ogc:Literal>
            </ogc:PropertyIsEqualTo>    	      
          </ogc:Filter>

          <MaxScaleDenominator>4000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">13</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#C0CCC4</CssParameter>
              <CssParameter name="stroke-width">18</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">12</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo> 
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption>  
          </TextSymbolizer>
        </Rule>

        <Rule>
          <Name>Motorway</Name>
          <Title>Motorway Line zoom 2</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>motorways</ogc:Literal>
            </ogc:PropertyIsEqualTo>    	      
          </ogc:Filter>

          <MinScaleDenominator>4000</MinScaleDenominator>
          <MaxScaleDenominator>15000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">6</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#C0CCC4</CssParameter>
              <CssParameter name="stroke-width">10</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">12</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo>
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption>   
          </TextSymbolizer>
        </Rule>

        <Rule>
          <Name>Motorway</Name>
          <Title>Motorway Line zoom 3</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>motorways</ogc:Literal>
            </ogc:PropertyIsEqualTo>    	      
          </ogc:Filter>

          <MinScaleDenominator>15000</MinScaleDenominator>
          <MaxScaleDenominator>20000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">7</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#C0CCC4</CssParameter>
              <CssParameter name="stroke-width">6.5</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">12</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
              <CssParameter name="font-weight">bold</CssParameter>				
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo>
            <Fill>
              <CssParameter name="fill">#202020</CssParameter>
            </Fill>
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption> 
          </TextSymbolizer>
        </Rule>

        <Rule>
          <Name>Motorway</Name>
          <Title>Motorway Line zoom 4</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>motorways</ogc:Literal>
            </ogc:PropertyIsEqualTo>    	      
          </ogc:Filter>

          <MinScaleDenominator>20000</MinScaleDenominator>
          <MaxScaleDenominator>40000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">5</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#C0CCC4</CssParameter>
              <CssParameter name="stroke-width">4.5</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">12</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
              <CssParameter name="font-weight">bold</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo>    
            <Fill>
              <CssParameter name="fill">#202020</CssParameter>
            </Fill>
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption> 
          </TextSymbolizer>
        </Rule>

        <Rule>
          <Name>Motorway</Name>
          <Title>Motorway Line zoom 5</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>motorways</ogc:Literal>
            </ogc:PropertyIsEqualTo>    	      
          </ogc:Filter>

          <MinScaleDenominator>40000</MinScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">2.5</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#C0CCC4</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">10</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
              <CssParameter name="font-color">#404a43</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo> 
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption> 
          </TextSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      <!-- end Motorway -->

      <!-- start Tram -->
      <FeatureTypeStyle>
        <Rule>
          <Name>Tram</Name>
          <Title>Tram Line zoom 1</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>type</ogc:PropertyName>
              <ogc:Literal>tram</ogc:Literal>
            </ogc:PropertyIsEqualTo>	    
          </ogc:Filter>
          <MaxScaleDenominator>14000</MaxScaleDenominator>

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#C0CCC4</CssParameter>
              <CssParameter name="stroke-width">4</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">3.5</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <GraphicStroke>
                <Graphic>
                  <Mark>
                    <WellKnownName>shape://vertline</WellKnownName>
                    <Stroke>
                      <CssParameter name="stroke">#C0CCC4</CssParameter>
                      <CssParameter name="stroke-width">2</CssParameter>
                    </Stroke>
                  </Mark>
                  <Size>6</Size>
                </Graphic>
              </GraphicStroke>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">12</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo>
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption>   
          </TextSymbolizer>
        </Rule>

        <Rule>
          <Name>Tram</Name>
          <Title>Tram Line zoom 2</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>type</ogc:PropertyName>
              <ogc:Literal>tram</ogc:Literal>
            </ogc:PropertyIsEqualTo>	    
          </ogc:Filter>
          <MinScaleDenominator>14000</MinScaleDenominator>
          <MaxScaleDenominator>160000</MaxScaleDenominator>

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#C0CCC4</CssParameter>
              <CssParameter name="stroke-width">2.5</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">2</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <GraphicStroke>
                <Graphic>
                  <Mark>
                    <WellKnownName>shape://vertline</WellKnownName>
                    <Stroke>
                      <CssParameter name="stroke">#C0CCC4</CssParameter>
                      <CssParameter name="stroke-width">1.5</CssParameter>
                    </Stroke>
                  </Mark>
                  <Size>6</Size>
                </Graphic>
              </GraphicStroke>
            </Stroke>
          </LineSymbolizer>
        </Rule>

        <Rule>
          <Name>Tram</Name>
          <Title>Tram Line zoom 3</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>type</ogc:PropertyName>
              <ogc:Literal>tram</ogc:Literal>
            </ogc:PropertyIsEqualTo>	    
          </ogc:Filter>
          <MinScaleDenominator>160000</MinScaleDenominator>
          <MaxScaleDenominator>260000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#C0CCC4</CssParameter>
              <CssParameter name="stroke-width">1.5</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <GraphicStroke>
                <Graphic>
                  <Mark>
                    <WellKnownName>shape://vertline</WellKnownName>
                    <Stroke>
                      <CssParameter name="stroke">#C0CCC4</CssParameter>
                      <CssParameter name="stroke-width">1.5</CssParameter>
                    </Stroke>
                  </Mark>
                  <Size>6</Size>
                </Graphic>
              </GraphicStroke>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      <!-- end Tram -->

      <!-- start Mainroads -->
      <FeatureTypeStyle>
        <Rule>	  
          <Name>Mainroads </Name>
          <Title>Mainroads Line zoom 1</Title>	  
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>mainroads</ogc:Literal>
            </ogc:PropertyIsEqualTo>		
          </ogc:Filter>
          <MaxScaleDenominator>4000</MaxScaleDenominator>

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">16</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">12</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
              <CssParameter name="font-color">#808080</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo>
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption> 
          </TextSymbolizer>
        </Rule>	

        <Rule>	  
          <Name>Mainroads </Name>
          <Title>Mainroads Line zoom 2</Title>	  
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>mainroads</ogc:Literal>
            </ogc:PropertyIsEqualTo>		
          </ogc:Filter>
          <MinScaleDenominator>4000</MinScaleDenominator>
          <MaxScaleDenominator>15000</MaxScaleDenominator>

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">8</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">12</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
              <CssParameter name="font-color">#808080</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo>
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption> 
          </TextSymbolizer>
        </Rule>

        <Rule>	  
          <Name>Mainroads </Name>
          <Title>Mainroads Line zoom 3</Title>	  
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>mainroads</ogc:Literal>
            </ogc:PropertyIsEqualTo>		
          </ogc:Filter>
          <MinScaleDenominator>15000</MinScaleDenominator>
          <MaxScaleDenominator>20000</MaxScaleDenominator>

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">4.5</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">12</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo>    
            <Fill>
              <CssParameter name="fill">#202020</CssParameter>
            </Fill>	
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption> 
          </TextSymbolizer>
        </Rule>

        <Rule>	  
          <Name>Mainroads </Name>
          <Title>Mainroads Line zoom 4</Title>	  
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>mainroads</ogc:Literal>
            </ogc:PropertyIsEqualTo>		
          </ogc:Filter>
          <MinScaleDenominator>20000</MinScaleDenominator>
          <MaxScaleDenominator>40000</MaxScaleDenominator>

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">2</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">10</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
              <CssParameter name="font-color">#808080</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo> 
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption> 
          </TextSymbolizer>
        </Rule>

        <Rule>	  
          <Name>Mainroads </Name>
          <Title>Mainroads Line zoom 5</Title>	  
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>mainroads</ogc:Literal>
            </ogc:PropertyIsEqualTo>		
          </ogc:Filter>
          <MinScaleDenominator>40000</MinScaleDenominator>
          <MaxScaleDenominator>70000</MaxScaleDenominator>

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">1.5</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      <!-- end Mainroads -->

      <!-- start Minorroads -->
      <FeatureTypeStyle>
        <Rule>	  
          <Name>Minorroads</Name>
          <Title>Minorroads Line zoom 1</Title> 
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>minorroads</ogc:Literal>
            </ogc:PropertyIsEqualTo>		
          </ogc:Filter>
          <MaxScaleDenominator>4000</MaxScaleDenominator>

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">12</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">10</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
              <CssParameter name="font-color">#eeeeee</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo>    
            <Fill>
              <CssParameter name="fill">#808080</CssParameter>
            </Fill>
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption> 
          </TextSymbolizer>
        </Rule>

        <Rule>	  
          <Name>Minorroads</Name>
          <Title>Minorroads Line zoom 2</Title> 
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>minorroads</ogc:Literal>
            </ogc:PropertyIsEqualTo>		
          </ogc:Filter>
          <MinScaleDenominator>4000</MinScaleDenominator>
          <MaxScaleDenominator>15000</MaxScaleDenominator>

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">6</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">10</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
              <CssParameter name="font-color">#eeeeee</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo>    
            <Fill>
              <CssParameter name="fill">#808080</CssParameter>
            </Fill>
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption> 
          </TextSymbolizer>
        </Rule>

        <Rule>	  
          <Name>Minorroads</Name>
          <Title>Minorroads Line zoom 3</Title> 
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>minorroads</ogc:Literal>
            </ogc:PropertyIsEqualTo>		
          </ogc:Filter>
          <MinScaleDenominator>15000</MinScaleDenominator>
          <MaxScaleDenominator>20000</MaxScaleDenominator>         

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">2</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
              <CssParameter name="font-size">10</CssParameter>
              <CssParameter name="font-family">Arial</CssParameter>
            </Font>          
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  0
                </PerpendicularOffset>       
              </LinePlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#E0E0E0</CssParameter>
              </Fill>
            </Halo>    
            <Fill>
              <CssParameter name="fill">#505050</CssParameter>
            </Fill>	
            <VendorOption name="maxDisplacement">50</VendorOption>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="removeOverlaps">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="group">true</VendorOption> 
          </TextSymbolizer>
        </Rule>

        <Rule>	  
          <Name>Minorroads</Name>
          <Title>Minorroads Line zoom 4</Title> 
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>class</ogc:PropertyName>
              <ogc:Literal>minorroads</ogc:Literal>
            </ogc:PropertyIsEqualTo>		
          </ogc:Filter>
          <MinScaleDenominator>20000</MinScaleDenominator>
          <MaxScaleDenominator>40000</MaxScaleDenominator>         

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#E0E0E0</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      <!-- end Minorroads -->
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>