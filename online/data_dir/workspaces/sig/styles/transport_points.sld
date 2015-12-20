<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
                       xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
                       xmlns="http://www.opengis.net/sld" 
                       xmlns:ogc="http://www.opengis.net/ogc" 
                       xmlns:xlink="http://www.w3.org/1999/xlink" 
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>transport_points</Name>
    <UserStyle>	    
      <Title>transport_points</Title>
      <Abstract>transport points markers</Abstract>	    		
      <!-- start of zoom level a --> 
      <FeatureTypeStyle>
        <Rule>
          <Name>tram_stations</Name>
          <Title>Tram stations</Title>
          <Abstract>Style for tram stations</Abstract>		
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>type</ogc:PropertyName>
              <ogc:Literal>tram_stop</ogc:Literal>
            </ogc:PropertyIsEqualTo>	    
          </ogc:Filter>

          <MaxScaleDenominator>20000</MaxScaleDenominator>		
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#307bc1</CssParameter>
                </Fill>
                <Stroke> 
                  <CssParameter name="stroke">#ffffff</CssParameter>
                  <CssParameter name="stroke-width">3</CssParameter>
                </Stroke>
              </Mark>
              <Size>14</Size>
            </Graphic>
          </PointSymbolizer>	
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
		    <CssParameter name="font-size">9</CssParameter>
		    <CssParameter name="font-family">Arial</CssParameter>
		  </Font>  
            <LabelPlacement>
              <PointPlacement>
                <AnchorPoint>
                  <AnchorPointX>
                    .5
                  </AnchorPointX>
                  <AnchorPointY>
                    -1.5
                  </AnchorPointY>
                </AnchorPoint>
              </PointPlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#f4faf6</CssParameter>
              </Fill>
            </Halo>    
            <Fill>
              <CssParameter name="fill">#21496e</CssParameter>
            </Fill>
          </TextSymbolizer>
        </Rule>

        <Rule>
          <Name>bus_stations</Name>
          <Title>Bus stations</Title>
          <Abstract>Style for bus stations</Abstract>		
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>type</ogc:PropertyName>
              <ogc:Literal>bus_stop</ogc:Literal>
            </ogc:PropertyIsEqualTo>	    
          </ogc:Filter>

          <MaxScaleDenominator>20000</MaxScaleDenominator>		
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#303bc7</CssParameter>
                </Fill>
                <Stroke> 
                  <CssParameter name="stroke">#ffffff</CssParameter>
                  <CssParameter name="stroke-width">3</CssParameter>
                </Stroke>
              </Mark>
              <Size>14</Size>
            </Graphic>
          </PointSymbolizer>	
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </Label>    
            <Font>
		    <CssParameter name="font-size">9</CssParameter>
		    <CssParameter name="font-family">Arial</CssParameter>
		  </Font> 
            <LabelPlacement>
              <PointPlacement>
                <AnchorPoint>
                  <AnchorPointX>
                    .5
                  </AnchorPointX>
                  <AnchorPointY>
                    -1.5
                  </AnchorPointY>
                </AnchorPoint>
              </PointPlacement>
            </LabelPlacement>
            <Halo>    
              <Radius>
                <ogc:Literal>1</ogc:Literal>
              </Radius>
              <Fill>
                <CssParameter name="fill">#f4faf6</CssParameter>
              </Fill>
            </Halo>    
            <Fill>
              <CssParameter name="fill">#21496e</CssParameter>
            </Fill>
          </TextSymbolizer>
        </Rule>	
      </FeatureTypeStyle>	    

    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>