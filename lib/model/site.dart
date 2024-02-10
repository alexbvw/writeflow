class Site {
  String? id;
  String? workspaceId;
  String? displayName;
  String? shortName;
  String? previewUrl;
  String? timeZone;
  String? createdOn;
  String? lastUpdated;
  String? lastPublished;
  List<String>? customDomains;
  Locales? locales;

  Site(
      {this.id,
      this.workspaceId,
      this.displayName,
      this.shortName,
      this.previewUrl,
      this.timeZone,
      this.createdOn,
      this.lastUpdated,
      this.lastPublished,
      this.customDomains,
      this.locales});

  Site.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    workspaceId = json['workspaceId'];
    displayName = json['displayName'];
    shortName = json['shortName'];
    previewUrl = json['previewUrl'];
    timeZone = json['timeZone'];
    createdOn = json['createdOn'];
    lastUpdated = json['lastUpdated'];
    lastPublished = json['lastPublished'];
    customDomains = json['customDomains'].cast<String>();
    locales =
        json['locales'] != null ? new Locales.fromJson(json['locales']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['workspaceId'] = this.workspaceId;
    data['displayName'] = this.displayName;
    data['shortName'] = this.shortName;
    data['previewUrl'] = this.previewUrl;
    data['timeZone'] = this.timeZone;
    data['createdOn'] = this.createdOn;
    data['lastUpdated'] = this.lastUpdated;
    data['lastPublished'] = this.lastPublished;
    data['customDomains'] = this.customDomains;
    if (this.locales != null) {
      data['locales'] = this.locales!.toJson();
    }
    return data;
  }
}

class Locales {
  Primary? primary;
  List<String>? secondary;

  Locales({this.primary, this.secondary});

  Locales.fromJson(Map<String, dynamic> json) {
    primary =
        json['primary'] != null ? new Primary.fromJson(json['primary']) : null;
    secondary = json['secondary'].cast<String>();
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.primary != null) {
      data['primary'] = this.primary!.toJson();
    }
    data['secondary'] = this.secondary;
    return data;
  }
}

class Primary {
  String? id;
  String? cmsLocaleId;
  bool? enabled;
  String? displayName;
  bool? redirect;
  String? subdirectory;
  String? tag;

  Primary(
      {this.id,
      this.cmsLocaleId,
      this.enabled,
      this.displayName,
      this.redirect,
      this.subdirectory,
      this.tag});

  Primary.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    cmsLocaleId = json['cmsLocaleId'];
    enabled = json['enabled'];
    displayName = json['displayName'];
    redirect = json['redirect'];
    subdirectory = json['subdirectory'];
    tag = json['tag'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['cmsLocaleId'] = this.cmsLocaleId;
    data['enabled'] = this.enabled;
    data['displayName'] = this.displayName;
    data['redirect'] = this.redirect;
    data['subdirectory'] = this.subdirectory;
    data['tag'] = this.tag;
    return data;
  }
}
