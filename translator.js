var Translator = function() {};

Translator.prototype.zombify = function(text) {
    text = text.replace(/[.!?] \b\w/g, function(m) { return m.toUpperCase(); }); // rule 3 and rule 10
    text = text.replace(/r\b/g, 'rh'); // rule 1
    text = text.replace(/(?!(rh\b|\brh\b))r/gi, 'RR'); // rule 8
    text = text.replace(/a/gi, 'hra'); // rule 2
    text = text.replace(/e/gi, 'rr'); // rule 4
    text = text.replace(/i/gi, 'rrRr'); // rule 5
    text = text.replace(/o/gi, 'rrrRr'); // rule 6
    text = text.replace(/u/gi, 'rrrrRr'); // rule 7
    text = text.replace(/\bg/gi, 'LLL'); // rule 9
    return text;
  };

  Translator.prototype.unzombify = function(text) {
    text = text.replace(/\bLLL/g, 'g');
    text = text.replace(/hra/g, 'a');
    text = text.replace(/rrrrRr/g, 'u');
    text = text.replace(/rrrRr/g, 'o');
    text = text.replace(/rrRr/g, 'i');
    text = text.replace(/rr/g, 'e');
    text = text.replace(/rh\b/g, 'r');
    text = text.replace(/RR/g, 'r');
    text = text.replace(/[.!?] \b\w/g, function(m) { return m.toUpperCase(); });
    return text;
  };

module.exports = new Translator();