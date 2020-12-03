var sacrifice = {
	unlocked: false,
	numericpoints: new Decimal(0),
	maxmultupgrades: [],
	maxproducerupgrades: [],
	repeatableclickupgrade: new sacrificeupgrade(new Decimal(10), new Decimal(5), null, "xDouble Click Power"),
	repeatablestartingnumberupgrade: new sacrificeupgrade(new Decimal(50), new Decimal(5), null, "+5 Starting Number"),
	repeatablenumbermultupgrade: new sacrificeupgrade(new Decimal(10), new Decimal(5), null, "x1.5 number from all sources"),
	repeatablenpmultupgrade: new sacrificeupgrade(new Decimal(50), new Decimal(5), null, "x1.2 NP gain"),
	generatemaxproducerupgrade(tier){
		return new sacrificeupgrade(Decimal.mul(10, Decimal.pow(2, tier - 1)), new Decimal(2), 10, "Increase the maximum of Producer " + tier);
	},
	generatemaxmultiplierupgrade(tier){
		return new sacrificeupgrade(Decimal.mul(40, Decimal.pow(2, tier - 1)), new Decimal(5), 3, "Increase the maximum of Multiplier " + tier);
	},
	addmaxupgrades(highesttier){
		while(this.maxmultupgrades.length < highesttier){
			this.maxmultupgrades.push(this.generatemaxmultiplierupgrade(this.maxmultupgrades.length + 1));
		}
		while(this.maxproducerupgrades.length < highesttier){
			this.maxproducerupgrades.push(this.generatemaxproducerupgrade(this.maxproducerupgrades.length + 1));
		}
	},
	get numericpointsonsacrifice(){
		var value = new Decimal(0);
		var i;
		for(i = 0; i < player.producers.length; i++){
			value = Decimal.plus(new Decimal(player.producers[i].numericpointsonsacrifice), value);
		}
		return value;
	},
	get canSacrifice(){
		return (game.player.tier >= 4 && this.numericpointsonsacrifice.gte(70));
	},
	sacrifice(){
		if(this.canSacrifice){
			this.addNumericPoints(this.numericpointsonsacrifice);
			player.tier = 0;
			player.resetEverythingTierUpDoes();
		}
	},
	addNumericPoints(points){
		points = points.times(Decimal.pow(new Decimal(1.2), this.repeatablenpmultupgrade.amount));
		this.numericpoints = this.numericpoints.plus(points);
	}
}
