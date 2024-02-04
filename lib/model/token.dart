class token {
  String? accessToken;
  String? tokenType;
  String? scope;

  token({this.accessToken, this.tokenType, this.scope});

  token.fromJson(Map<String, dynamic> json) {
    accessToken = json['access_token'];
    tokenType = json['token_type'];
    scope = json['scope'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['access_token'] = this.accessToken;
    data['token_type'] = this.tokenType;
    data['scope'] = this.scope;
    return data;
  }
}
