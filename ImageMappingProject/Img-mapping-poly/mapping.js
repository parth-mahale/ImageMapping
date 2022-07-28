// $('#screenshot').mapster({
//     singleSelect: true,
//     fill : true,
//     fillOpacity : 0.6,
//     fillColor: 'ffffff',
//     onMouseover: function(e) {
//         $(this).mapster('set',false).mapster('set',true);
//     },
//     onMouseout: function(e) { 
//          $(this).mapster('set',false);
//     }
// });

// var inArea,
//             map = $('#screenshot'),
//             captions = {
//                 data_0: ["Paul McCartney - Bass Guitar and Vocals",
//                     "Paul McCartney's song, Yesterday, recently voted the most popular song "
//                       + "of the century by a BBC poll, was initially composed without lyrics. "
//                       + "Paul used the working title 'scrambled eggs' before coming up with the final words."],
//                 data_1: ["Ringo Starr - Drums",
//                   "Dear Prudence was written by John and Paul about Mia Farrow's sister, Prudence, "
//                     + "when she wouldn't come out and play with Mia and the Beatles at a religious retreat "
//                     + "in India."]
//             },
//             single_opts = {
//                 fillColor: '000000',
//                 fillOpacity: 0,
//                 stroke: true,
//                 strokeColor: 'ff0000',
//                 strokeWidth: 2
//             },
//             all_opts = {
//                 fillColor: 'ffffff',
//                 fillOpacity: 0.6,
//                 stroke: true,
//                 strokeWidth: 2,
//                 strokeColor: 'ffffff'
//             },
//             initial_opts = {
//                 mapKey: 'data-name',
//                 isSelectable: false,
//                 onMouseover: function (data) {
//                     inArea = true;
//                     $('#beatles-caption-header').text(captions[data.key][0]);
//                     $('#beatles-caption-text').text(captions[data.key][1]);
//                     $('#beatles-caption').show();
//                 },
//                 onMouseout: function (data) {
//                     inArea = false;
//                     $('#beatles-caption').hide();
//                 }
//             };
//         opts = $.extend({}, all_opts, initial_opts, single_opts);

//         map.mapster('unbind')
//             .mapster(opts)
//             .bind('mouseover', function () {
//                 if (!inArea) {
//                     map.mapster('set_options', all_opts)
//                        .mapster('set', true, 'all')
//                        .mapster('set_options', single_opts);
//                 }
//             }).bind('mouseout', function () {
//                 if (!inArea) {
//                     map.mapster('set', false, 'all');
//                 }
//             });