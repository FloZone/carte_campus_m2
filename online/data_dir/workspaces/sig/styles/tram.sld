<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
                       xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
                       xmlns="http://www.opengis.net/sld" 
                       xmlns:ogc="http://www.opengis.net/ogc" 
                       xmlns:xlink="http://www.w3.org/1999/xlink" 
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <!-- a named layer is the basic building block of an sld document -->

  <NamedLayer>
    <Name>Tram</Name>
    <UserStyle>
      <!-- they have names, titles and abstracts -->

      <Title>A boring default style</Title>
      <Abstract>A sample style that just prints out a green line</Abstract>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- a feature type for lines -->

      <FeatureTypeStyle>
        <!--FeatureTypeName>Feature</FeatureTypeName-->
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
              <CssParameter name="stroke">#f4faf6</CssParameter>
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
              <CssParameter name="stroke">#f4faf6</CssParameter>
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

          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#C0CCC4</CssParameter>
              <CssParameter name="stroke-width">1.5</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#f4faf6</CssParameter>
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
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>