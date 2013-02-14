jQuery(document).ready(function($){
    if( $('#carousel').length > 0 ) carousel.init();
});

var carousel = {

    working: false,
    slide_length: 0, // changed on init
    padding_margin_offset: 35, // amount of padding and margins per slide
    displaying: 3, // number of current right hand slide, used for tracking the right end of the carousel. dont scroll past carousel.length
    perpetual: true, // if false it will fast forward and rewing at the beginning or end of the carousel. if true will go forever in either direction.

    init:function(){
        // length of slides
        carousel.slide_length = jQuery( '#carousel li.carousel-item' ).width() + carousel.padding_margin_offset;

        // change width of carousel to accomidate all slides so everything is on a horizontal plane
        jQuery( '#carousel' ).css({width:jQuery( '#carousel li.carousel-item' ).width() * jQuery( '#carousel li.carousel-item' ).length + carousel.padding_margin_offset * jQuery( '#carousel li.carousel-item' ).length } );

        // bindings
        jQuery( 'a.carousel-left' ).click( function(){ jQuery(this).blur(); return carousel.slide_right(); } );
        jQuery( 'a.carousel-right' ).click( function(){ jQuery(this).blur(); return carousel.slide_left(); } );
    },

    slide_left: function(){
        if( ! carousel.working )
        {
            if( carousel.displaying <= jQuery( '#carousel li.carousel-item' ).length - 1 )
            {
                carousel.working = true;
                jQuery( '#carousel' ).animate({ left: parseInt( jQuery( '#carousel' ).css('left').replace(/px/ig, "") ) - carousel.slide_length + 'px' }, 'slow', null, function(){
                    carousel.working = false;
                    carousel.displaying += 1;
                });
            }
            else
            {
                /*if( carousel.prepetual === true )*/
                    carousel.first_to_last();
                /*else
                    carousel.rewind();*/
            }
        }
        return false;
    },

    slide_right: function(){
        if( ! carousel.working )
        {
            if( parseInt( jQuery( '#carousel' ).css('left').replace(/px/ig, "") ) < 0 )
            {
                carousel.working = true;
                jQuery( '#carousel' ).animate( { left: parseInt( jQuery( '#carousel' ).css('left').replace(/px/ig, "") ) + carousel.slide_length + 'px' }, 'slow', 'swing', function(){
                    carousel.working = false;
                    carousel.displaying -= 1;
                    console.log( carousel.displaying );
                } );
            }
            else
            {
                /*if( carousel.prepetual === true )*/
                    carousel.last_to_first();
                /*else
                    carousel.fast_forward();*/
            }
        }
        return false;
    },

    rewind: function(){
        if( ! carousel.working )
        {
            carousel.working = true;
            jQuery( '#carousel' ).animate({ left: 0  }, 'slow', function(){
                carousel.displaying = 3;
                carousel.working = false;
            } );
        }
    },

    fast_forward: function(){
        if( ! carousel.working )
        {
            carousel.working = true;
            jQuery( '#carousel' ).animate({ left: '-' + parseInt( jQuery( '#carousel' ).width() - ( ( carousel.slide_length  ) * 3 ) )  }, 'slow', function(){
                carousel.displaying = jQuery( '#carousel li.carousel-item' ).length;
                carousel.working = false;
            } );
        }
    },

    last_to_first: function(){
        carousel.displaying -= 1;
        var slide = jQuery( '#carousel li.carousel-item:last-child' ).clone();
        jQuery( '#carousel li.carousel-item:last-child' ).remove();

        jQuery( '#carousel' ).prepend( slide ).css({ left: parseInt( jQuery( '#carousel' ).css('left').replace(/px/ig, "") - carousel.slide_length ) + 'px' });

        carousel.slide_right();
    },

    first_to_last: function(){
        carousel.displaying += 1;
        var current_position = jQuery( '#carousel' ).css('left');

        var slide = jQuery( '#carousel li:nth-child(1)' ).clone();

        jQuery( '#carousel li.carousel-item:nth-child(1)' ).remove();
        jQuery( '#carousel' ).append( slide ).css({ left: parseInt( parseInt( current_position.replace(/px/ig, "") ) + carousel.slide_length ) + 'px' });

        //carousel.slide_left();
        jQuery( '#carousel' ).animate({left: parseInt( jQuery( '#carousel' ).css('left').replace(/px/ig, "") ) - carousel.slide_length + 'px' });

    }

}