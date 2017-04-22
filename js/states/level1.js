
var level1State = {

    ents: [],

    preload: function() {
        
        this.ents.push(createAntibody());

        this.ents.forEach(function(ent) {
            ent.preload();
        }, this);

    },

    create: function() {

        game.stage.backgroundColor = "#FFB6C1";

        this.ents.forEach(function(ent) {
            ent.create();
        }, this);

    },


    update: function() {

        this.ents.forEach(function(ent) {
            ent.update();
        }, this);	

    },


}