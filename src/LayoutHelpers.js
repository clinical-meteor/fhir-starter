import _ from 'lodash';
let get = _.get;
let set = _.set;
let has = _.has;

LayoutHelpers = {
  calcCanvasPaddingWidth: function(){
    let paddingWidth = get(Meteor, 'settings.public.defaults.defaultPagePadding', 0);

    if(get(Meteor, 'settings.public.defaults.sidebar.minibarVisible', false)){
      paddingWidth = 20;

      if(Meteor.isCordova){
        paddingWidth = 20;
      }
      if(window.innerWidth > 768){
        paddingWidth = 104;
      }
  
    }
    return paddingWidth;
  },
  determineFormFactor: function(numColumns, totalMargins){
    if(!numColumns){
      numColumns = 1;
    }
    if(!totalMargins){
      totalMargins = 200;
    }

    let formFactor = "phone";
    let calculatedInnerWidth = ((window.innerWidth - totalMargins) / numColumns).toFixed(0);

    if(calculatedInnerWidth >= 768){
      formFactor = "tablet";
    } 
    if(calculatedInnerWidth >= 1200){
      formFactor = "desktop";
    } 
    if(calculatedInnerWidth >= 1920){
      formFactor = "hdmi";
    } 
    if(calculatedInnerWidth >= 4000){
      formFactor = "videowall";
    }

    return formFactor;
  },
  calcCardRowHeight: function(numberOfRows, rowSpacing){
    let cardRowHeight = 0;
    let fractionalRowHeight = 1;
    let innerCanvasHeight = 0;  

    let headerHeight = footerHeight = 64;
    if(get(Meteor, 'settings.public.defaults.prominantHeader')){
      headerHeight = 128;
    }

    if(!rowSpacing){
      rowSpacing = 20;
    }

    if(numberOfRows > 0){
      fractionalRowHeight = 1 / numberOfRows;

      if(window.innerHeight > 0){
        innerCanvasHeight = LayoutHelpers.calcInnerCanvasHeight();

        cardRowHeight = ((innerCanvasHeight - ((numberOfRows + 1) * rowSpacing)) * fractionalRowHeight).toFixed(0);
      }       
    }
    return cardRowHeight;
  },
  calcCardRowContentHeight: function(numberOfRows, cardHeaderHeight, rowSpacing){    
    if(!cardHeaderHeight){
      cardHeaderHeight = 0;
    }
    if(!numberOfRows){
      numberOfRows = 1;
    }
    if(!rowSpacing){
      rowSpacing = 20;
    }
    let cardRowContentHeight = LayoutHelpers.calcCardRowHeight(numberOfRows, rowSpacing) - cardHeaderHeight;
    return cardRowContentHeight;
  },
  calcCardContentHeight: function(cardHeight){
    if(cardHeight > 40){
      return cardHeight - 40;
    }
  },
  calcHeaderHeight: function(){
    let headerHeight = 64;
    if(get(Meteor, 'settings.public.defaults.prominantHeader')){
      headerHeight = 128;
    }
    return headerHeight;
  },
  calcInnerCanvasHeight: function(headerHeight, footerHeight, innerHeight){
    if(!headerHeight){
      headerHeight = 64;
    }
    if(get(Meteor, 'settings.public.defaults.prominantHeader')){
      headerHeight = 128;
    }
    if(!footerHeight){
      footerHeight = 64;
    }

    if(!innerHeight){
      innerHeight = window.innerHeight;
    }
    
    let canvasHeight = 0;
    if(Meteor.isClient){
      canvasHeight = innerHeight - headerHeight - footerHeight;
    }

    // Should we also include the Meteor.isServer case?
    // How would this work as server-side rendering?  

    return canvasHeight;
  },
  calcTableRows: function(tableSize, innerHeight){
    let rowHeight = 52;
    if(tableSize === "small"){
      rowHeight = 33;
    }

    let innerCanvasHeight = LayoutHelpers.calcInnerCanvasHeight(null, null, innerHeight);
    let cardHeaderHeight = 64;
    if(get(Meteor, 'settings.public.defaults.prominantHeader')){
      cardHeaderHeight = 128;
    }

    let cardMargin = 20;
    let tableMargins = 60;
    let tableHeight = innerCanvasHeight - cardMargin - cardHeaderHeight - tableMargins - 100;
    let numberOfRows = Number((tableHeight / rowHeight).toFixed(0));

    return numberOfRows;
  }
}

export default LayoutHelpers;


