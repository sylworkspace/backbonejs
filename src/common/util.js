function Request(baseUrl, query) {
  this.baseUrl = baseUrl;
  this.query = null;

  if ( query ) {
    this.query = query;
  }
}

Request.prototype.url = function() {
  return Request.makeUrl(this.baseUrl, this.query);
};

Request.prototype.getJSON = function(callback) {
  getJSON(this.url(), callback);
};

Request.prototype.postJSON = function(data, callback) {
  postJSON(this.url(), data, callback);
};

Request.makeUrl = function(baseUrl, query) {
  if ( !query ) {
    return baseUrl;
  }

  var queryString = Request.makeQueryString(query);
  if ( queryString.length === 0 ) {
    return baseUrl;
  }

  return baseUrl + '?' + queryString;
};

Request.extractBaseUrl = function(href) {
  var queryPos = href.indexOf('?');
  if ( queryPos === -1 ) {
    return href;
  }

  return href.slice(0, queryPos);
};

Request.makeQueryString = function(parameters) {
  var parameterList = [];
  for ( const key in parameters ) {
    const value = parameters[key];

    parameterList.push(key + '=' + value);
  }

  return parameterList.join('&');
};

Request.parseQueryString = function(queryString) {
  queryString = queryString.substring(1);
  if ( queryString === null || queryString === '' ) {
    return {};
  }

  var parameterList = queryString.split('&');
  var parameters = {};
  for ( const parameterIndex in parameterList ) {
    const parameter = parameterList[parameterIndex];

    const keyValue = parameter.split('=');
    const key = keyValue[0];
    const value = keyValue[1];

    parameters[key] = value;
  }

  return parameters;
};

function postJSON(url, data, callback) {
  $.ajax({
    url: url,
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(data),
    dataType: 'json',
    success: function(rdata) {
      callback(null, rdata);
    },
    error: function(req, message, e) {
      callback({
        req,
        message,
        e
      });
    }
  });
}

function getJSON(url, callback) {
  $.ajax({
    url: url,
    type: 'get',
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      callback(null, data);
    },
    error: function(req, message, e) {
      callback({
        req,
        message,
        e
      });
    }
  });
}

function disableAll(e) {
  e.preventDefault();
  e.stopPropagation();
}

function formatDate(date) {
  return `${date.getFullYear()}-` +
    paddingZero(date.getMonth() + 1, 2) + '-' +
    paddingZero(date.getDate(), 2);
}

function paddingZero(number, width) {
  var numberString = String(number);
  if ( numberString.length < width ) {
    numberString = '0'.repeat(width - numberString.length) + numberString;
  }

  return numberString;
}

function getDateOfDatePicker(widget) {
  var $widget = widget;
  if ( typeof widget === 'string' ) {
    $widget = $(widget);
  }

  var dateString = $widget.val();

  return fromDateString(dateString);
}

function fromDateString(dateString) {
  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(5, 7)) - 1;
  const date = Number(dateString.slice(8, 10));
  const hour = Number(dateString.slice(11, 13));
  const minute = Number(dateString.slice(14, 16));

  return new Date(year, month, date, hour, minute);
}

function getObjectValue(obj, attrName, defaultValue) {
  if ( !obj || !(attrName in obj) ) {
    return defaultValue;
  }

  return obj[attrName];
}

module.exports = {
  Request: Request,
  disableAll: disableAll,
  formatDate: formatDate,
  paddingZero: paddingZero,
  getDateOfDatePicker: getDateOfDatePicker,
  fromDateString: fromDateString,
  getObjectValue,
};
