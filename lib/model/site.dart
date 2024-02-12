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
        json['locales'] != null ? Locales.fromJson(json['locales']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['workspaceId'] = workspaceId;
    data['displayName'] = displayName;
    data['shortName'] = shortName;
    data['previewUrl'] = previewUrl;
    data['timeZone'] = timeZone;
    data['createdOn'] = createdOn;
    data['lastUpdated'] = lastUpdated;
    data['lastPublished'] = lastPublished;
    data['customDomains'] = customDomains;
    if (locales != null) {
      data['locales'] = locales!.toJson();
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
        json['primary'] != null ? Primary.fromJson(json['primary']) : null;
    secondary = json['secondary'].cast<String>();
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (primary != null) {
      data['primary'] = primary!.toJson();
    }
    data['secondary'] = secondary;
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
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['cmsLocaleId'] = cmsLocaleId;
    data['enabled'] = enabled;
    data['displayName'] = displayName;
    data['redirect'] = redirect;
    data['subdirectory'] = subdirectory;
    data['tag'] = tag;
    return data;
  }
}
