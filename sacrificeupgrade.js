class sacrificeupgrade {
	constructor(cost, scaling, maxlevel, name){
		this._cost = cost;
		this.scaling = scaling;
		this.maxlevel = maxlevel;
		this.amount = 0;
		this.name = name;
	}
	get cost(){
		return Decimal.mul(Decimal.pow(this.scaling, this.amount), this._cost);
	}
	get canbuy(){
		if(this.maxnum != null){
			if(this.amount >= this.maxnum) return false;
		}
		else return this.cost.lte(sacrifice.numericpoints);
	}
	buy(){
		if(!this.canbuy) return;
		sacrifice.numericpoints -= this.cost;
		this.amount += 1;
	}
	
}
Vue.component('sacrificeupgradedisplay', {
	props: {
		upgrade: sacrificeupgrade
	},
	data: function(){
		return {
			
		}
	},
	methods: {
		format(amount){
			return format(amount);
		}
	},
	template: 
	`<div class="sacrificeupgradedisplay">
		<button @click="upgrade.buy()">{{upgrade.name}}: {{format(upgrade.cost)}} NP</button>
	</div>`
});