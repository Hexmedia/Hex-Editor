{
	var Plugin;

	Plugin = function ( id, name, title, icon ) {
		this.type = $pt.SIMPLE;
		this.name = name;
		this.title = title;
		this.icon = icon;
		this.id = id;
		this.description = null;
		this.template = "simple";
	};

	Plugin.prototype.use = function ( how ) {
		throw "Need to implement use function";
	};

	Plugin.prototype.display = function ( how ) {
		var viewData = {
			id: this.id,
			name: this.name,
			title: this.title,
			description: this.description
		};

		if (this.icon) {
			viewData.class = "fa fa-" + this.icon;
		}

//		Mustache.render(, viewData);
	};

	$p.Plugin = Plugin;
}
