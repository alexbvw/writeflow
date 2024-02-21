class Collection {
  String? id;
  String? displayName;
  String? singularName;
  String? slug;
  String? createdOn;
  String? lastUpdated;

  Collection(
      {this.id,
      this.displayName,
      this.singularName,
      this.slug,
      this.createdOn,
      this.lastUpdated});

  Collection.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    displayName = json['displayName'];
    singularName = json['singularName'];
    slug = json['slug'];
    createdOn = json['createdOn'];
    lastUpdated = json['lastUpdated'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['displayName'] = this.displayName;
    data['singularName'] = this.singularName;
    data['slug'] = this.slug;
    data['createdOn'] = this.createdOn;
    data['lastUpdated'] = this.lastUpdated;
    return data;
  }
}
