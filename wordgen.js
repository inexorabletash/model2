// The Traveller game in all forms is owned by Far Future Enterprises.
// Copyright (C) 1977 - 2013 Far Future Enterprises.

// Updates:
// - 2013-02-25 - Added Gurvin and Ithklur; updated copyright dates

var Languages = {};

// From JTAS #17
Languages.Vilani = {
  // "... V, CV, VC, and CVC. Their proportion in Vilani is about 1:4:3:2."
  // "A syllable beginning with a vowel should very rarely follow a syllable
  // ending with a vowel (less than 1% of the time)." -- John Harshman, JTAS #17
  // (The following ratios were determined by trial and error.)

  // Syllable determination
  basicSyllables: [["V", 5], ["CV", 9], ["VC", 15], ["CVC", 3]],
  alternateSyllables: [["CV", 22], ["CVC", 14]],

  // Occurence of V is less than 1% after another V - treated as "never"
  nextSyllable: {
    "V": "alternateSyllables",
    "CV": "alternateSyllables",
    "VC": "basicSyllables",
    "CVC": "basicSyllables"
  },

  // Phoneme determination
  initialConsonants: [
    ["K", 17], ["G", 17], ["M", 10], ["D", 10], ["L", 10], ["SH", 10], ["KH", 8],
    ["N", 5], ["S", 5], ["P", 2], ["B", 2], ["Z", 2], ["R", 2]
  ],
  vowels: [
    ["A", 8], ["E", 2], ["I", 7], ["U", 5], ["AA", 1], ["II", 2], ["UU", 1]
  ],
  finalConsonants: [
    ["R", 12], ["N", 4], ["M", 6], ["SH", 4], ["G", 2], ["S", 2], ["D", 2], ["P", 1], ["K", 1]
  ],

  // Simplification
  reductionRules: [["SS", "S"], ["ZZ", "Z"], ["SHSH", "SH"], ["DT", "DD"]]
};

// From Alien Module 1: Aslan
Languages.Aslan = {
  // Syllable determination
  basicSyllables: [["V", 13], ["CV", 9], ["VC", 8], ["CVC", 6]],
  alternateSyllables: [["V", 15], ["VC", 21]],

  nextSyllable: {
    "V": "basicSyllables",
    "CV": "basicSyllables",
    "VC": "alternateSyllables",
    "CVC": "alternateSyllables"
  },

  filterPhoneme: function(p, n) {
    // a single letter vowel can never be followed directly by the same single letter vowel
    if ((/^[AEIOUY]$/).test(p) && p == n) {
      return false;
    } else {
      return true;
    }
  },

  // Phoneme determination
  initialConsonants: [
    ["F", 5], ["FT", 4], ["H", 7], ["HF", 2], ["HK", 5], ["HL", 3], ["HR", 3], ["HT", 5], ["HW", 2],
    ["K", 7], ["KH", 6], ["KHT", 4], ["L", 2], ["R", 3], ["S", 4], ["ST", 3], ["T", 8], ["TL", 2],
    ["TR", 2], ["W", 6]
  ],
  vowels: [
    ["A", 10], ["AI", 3], ["AO", 2], ["AU", 1], ["E", 6], ["EA", 6], ["EI", 2], ["I", 4], ["IY", 3],
    ["O", 2], ["OA", 1], ["OI", 2], ["OU", 1], ["U", 1], ["UA", 1], ["UI", 1], ["YA", 2], ["YU", 2]
  ],
  finalConsonants: [
    ["H", 10], ["KH", 4], ["L", 7], ["LR", 3], ["R", 5], ["RL", 4], ["S", 5], ["W", 6], ["'", 3]
  ]
};

// From Alien Module 2: K'kree
Languages.Kkree = {
  // Syllable determination
  basicSyllables: [["V", 3], ["CV", 15], ["VC", 6], ["CVC", 12]],
  afterC: [["V", 12], ["VC", 24]],
  afterV: [["CV", 24], ["CVC", 12]],

  nextSyllable: { "V": "afterV", "CV": "afterV", "VC": "afterC", "CVC": "afterC" },

  terminatesWord: function(s) { return s === "CVC"; },

  // Phoneme determination
  initialConsonants: [
    ["B", 1], ["G", 3], ["GH", 6], ["GN", 4], ["GR", 2], ["GZ", 1], ["HK", 2], ["K", 24], ["KR", 10],
    ["KT", 1], ["L", 5], ["M", 2], ["MB", 1], ["N", 4], ["P", 1], ["R", 12], ["RR", 3], ["T", 7],
    ["TR", 2], ["X", 4], ["XK", 1], ["XR", 1], ["XT", 1]
  ],
  vowels: [
    ["A", 19], ["AA", 2], ["E", 3], ["EE", 4], ["I", 6], ["II", 2], ["O", 1], ["OO", 2], ["U", 6],
    ["UU", 2], ["'", 8], ["!", 3], ["!!", 1], ["!'", 1]
  ],
  finalConsonants: [
    ["B", 1], ["G", 2], ["GH", 1], ["GR", 1], ["K", 6], ["KR", 3], ["L", 2], ["M", 1], ["N", 2],
    ["NG", 3], ["P", 1], ["R", 8], ["RR", 4], ["T", 3], ["X", 3], ["XK", 1]
  ]
};

// From Alien Module 3: Vargr
Languages.Vargr = {
  // Syllable determination
  basicSyllables: [["V", 4], ["CV", 4], ["VC", 14], ["CVC", 14]],
  alternateSyllables: [["CV", 18], ["CVC", 18]],

  nextSyllable: {
    "V": "alternateSyllables",
    "CV": "alternateSyllables",
    "VC": "basicSyllables",
    "CVC": "basicSyllables"
  },

  // Phoneme determination
  initialConsonants: [
    ["D", 5], ["DH", 5], ["DZ", 3], ["F", 4], ["G", 10], ["GH", 6], ["GN", 2], ["GV", 4], ["GZ", 4],
    ["K", 10], ["KF", 3], ["KH", 6], ["KN", 3], ["KS", 3], ["L", 4], ["LL", 4], ["N", 2], ["NG", 2],
    ["R", 5], ["RR", 4], ["S", 5], ["T", 4], ["TH", 4], ["TS", 2], ["V", 5], ["Z", 6]
  ],
  vowels: [
    ["A", 5], ["AE", 4], ["E", 2], ["I", 1], ["O", 4], ["OE", 2], ["OU", 2], ["U", 3], ["UE", 3]
  ],
  finalConsonants: [
    ["DH", 1], ["DZ", 1], ["G", 3], ["GH", 2], ["GHZ", 1], ["GZ", 1], ["K", 2], ["KH", 2], ["KHS", 1],
    ["KS", 1], ["L", 2], ["LL", 1], ["N", 5], ["NG", 5], ["R", 3], ["RR", 3], ["RRG", 1], ["RRGH", 1],
    ["RS", 1], ["RZ", 1], ["S", 1], ["TH", 1], ["TS", 1], ["Z", 2]
  ]
};

// From Alien Module 4: Zhodani
Languages.Zhodani = {
  // Syllable determination
  basicSyllables: [["V", 7], ["CV", 11], ["VC", 11], ["CVC", 7]],
  alternateSyllables: [["V", 6], ["CV", 6], ["VC", 6], ["CVC", 18]],

  nextSyllable: {
    "V": "basicSyllables",
    "CV": "basicSyllables",
    "VC": "alternateSyllables",
    "CVC": "alternateSyllables"
  },

  // Phoneme determination
  initialConsonants: [
    ["B", 3], ["BL", 2], ["BR", 3], ["CH", 3], ["CHT", 7], ["D", 6], ["DL", 4], ["DR", 3], ["F", 3],
    ["FL", 2], ["FR", 2], ["J", 4], ["JD", 3], ["K", 3], ["KL", 1], ["KR", 1], ["L", 2], ["M", 1],
    ["N", 5], ["P", 4], ["PL", 4], ["PR", 2], ["Q", 1], ["QL", 1], ["QR", 1], ["R", 3], ["S", 4],
    ["SH", 4], ["SHT", 4], ["ST", 4], ["T", 3], ["TL", 6], ["TS", 2], ["V", 3], ["VL", 1], ["VR", 1],
    ["Y", 2], ["Z", 3], ["ZD", 6], ["ZH", 4], ["ZHD", 6]
  ],
  vowels: [
    ["A", 7], ["E", 8], ["I", 5], ["IA", 4], ["IE", 4], ["O", 2], ["R", 1]
  ],
  finalConsonants: [
    ["B", 1], ["BL", 4], ["BR", 4], ["CH", 3], ["D", 2], ["DL", 4], ["DR", 4], ["F", 3], ["FL", 3],
    ["FR", 3], ["J", 2], ["K", 1], ["KL", 2], ["KR", 1], ["L", 7], ["M", 1], ["N", 1], ["NCH", 4],
    ["NJ", 3], ["NS", 3], ["NSH", 4], ["NT", 2], ["NTS", 2], ["NZ", 3], ["NZH", 4], ["P", 1], ["PL", 4],
    ["PR", 4], ["Q", 1], ["QL", 1], ["QE", 1], ["R", 3], ["SH", 4], ["T", 2], ["TS", 4], ["TL", 5],
    ["V", 3], ["VL", 2], ["VR", 3], ["Z", 5], ["ZH", 4], ["'", 4]
  ],

  // Simplification
  reductionRules: [["RRR", "R"], ["NCH(CHT|SHT|ZHD)", "NCH"], ["NTS(CHT|SHT|ZHD)", "NTS"], ["NZH(CHT|SHT|ZHD)", "NZH"]]
};

// From Alien Module 5: Droyne
Languages.Droyne = {
  // Syllable determination
  basicSyllables: [["V", 7], ["CV", 11], ["VC", 11], ["CVC", 7]],
  alternateSyllables: [["V", 6], ["CV", 6], ["VC", 6], ["CVC", 18]],

  nextSyllable: {
    "V": "basicSyllables",
    "CV": "basicSyllables",
    "VC": "alternateSyllables",
    "CVC": "alternateSyllables"
  },

  // Phoneme determination
  initialConsonants: [
    ["B", 8], ["BR", 4], ["D", 12], ["DR", 5], ["F", 13], ["H", 13], ["K", 13], ["KR", 3], ["L", 9],
    ["M", 14], ["N", 14], ["P", 12], ["PR", 2], ["R", 11], ["S", 24], ["SS", 10], ["ST", 3], ["T", 10],
    ["TH", 5], ["TR", 4], ["TS", 9], ["TW", 9], ["V", 9]
  ],
  vowels: [
    ["A", 7], ["AY", 8], ["E", 5], ["I", 4], ["O", 4], ["OY", 2], ["U", 1], ["YA", 9], ["YO", 7], ["YU", 11]
  ],
  finalConsonants: [
    ["B", 6], ["D", 11], ["F", 5], ["H", 6], ["K", 8], ["L", 4], ["LB", 2], ["LD", 7], ["LK", 4], ["LM", 3],
    ["LN", 1], ["LP", 1], ["LS", 2], ["LT", 2], ["M", 11], ["N", 7], ["P", 12], ["R", 9], ["RD", 3],
    ["RF", 2], ["RK", 5], ["RM", 4], ["RN", 3], ["RP", 1], ["RS", 4], ["RT", 5], ["RV", 2], ["S", 23],
    ["SK", 6], ["SS", 8], ["ST", 5], ["T", 12], ["TH", 6], ["TS", 10], ["V", 4], ["X", 12]
  ],

  // Simplification
  reductionRules: [["AA", "A"], ["EE", "E"], ["II", "I"], ["OO", "O"], ["UU", "U"]]
};

// From Alien Module 8: Darrians
Languages.Darrian = {
  // Syllable determination
  basicSyllables: [["CV", 9], ["CVC", 27]],
  alternateSyllables: [["V", 9], ["VC", 27]],

  nextSyllable: {
    "V": "basicSyllables",
    "CV": "basicSyllables",
    "VC": "alternateSyllables",
    "CVC": "alternateSyllables"
  },

  // Phoneme determination
  initialConsonants: [
    ["B", 17], ["D", 22], ["G", 7], ["P", 12], ["T", 8], ["TH", 7], ["K", 5], ["M", 10], ["N", 22], ["Z", 22],
    ["L", 10], ["R", 14], ["Y", 6], ["ZB", 4], ["ZD", 5], ["ZG", 2], ["ZL", 3], ["MB", 5], ["ND", 5],
    ["NGG", 3], ["RY", 5], ["LY", 3], ["LZ", 5], ["LD", 7]
  ],
  vowels: [
    ["A", 8], ["E", 8], ["EH", 5], ["I", 9], ["IH", 8], ["O", 5], ["U", 2]
  ],
  finalConsonants: [
    ["BH", 9], ["DH", 9], ["GH", 6], ["P", 6], ["T", 6], ["K", 9], ["N", 29], ["NG", 12], ["L", 23],
    ["R", 29], ["S", 18], ["M", 15], ["MB", 6], ["ND", 6], ["NGG", 3], ["YR", 6], ["LY", 3], ["NY", 3],
    ["LBH", 3], ["LZ", 6], ["LD", 9]
  ]
};

// From http://traveller.mu.org/archive/languages/gurvin.txt
// by Leroy Guatney and Mike Mikesh
// Note that GURPS Traveller: Alien Races 3 has a separate
// set of frequency tables and rules for Gurvin.
// Discussion: http://forums.sjgames.com/showthread.php?t=23024
Languages.Gurvin = {
  // Syllable determination
  basicSyllables: [["CV", 12], ["VC", 12], ["CVC", 12]],
  alternateSyllables: [["V", 6], ["CV", 2], ["VC", 14], ["CVC", 14]],

  nextSyllable: {
    "V": "basicSyllables",
    "CV": "basicSyllables",
    "VC": "alternateSyllables",
    "CVC": "alternateSyllables"
  },

  // Phoneme determination
  initialConsonants: [
    ["BL", 6], ["C", 6], ["D", 12], ["DR", 6], ["F", 6], ["G", 18], ["GL", 4], ["H", 4], ["K", 24],
    ["KL", 4], ["L", 12], ["LD", 3], ["LY", 3], ["M", 8], ["N", 22], ["P", 12], ["PHL", 8], ["Q", 4],
    ["R", 9], ["S", 3], ["SL", 6], ["SP", 6], ["T", 6], ["TH", 3], ["TR", 7], ["V", 4], ["W", 2],
    ["WR", 6], ["Z", 2]],
  vowels: [
    ["A", 72], ["E", 36], ["I", 30], ["O", 30], ["OO", 12], ["U", 24], ["UA", 8], ["Y", 4]
  ],
  finalConsonants: [
    ["C", 12], ["CK", 6], ["D", 3], ["F", 6], ["FT", 3], ["G", 3], ["H", 3], ["K", 3], ["L", 18],
    ["LD", 3], ["M", 6], ["N", 36], ["NSK", 3], ["NT", 3], ["P", 6], ["PHL", 3], ["Q", 9],
    ["R", 23], ["RK", 2], ["RN", 6], ["RT", 2], ["S", 3], ["SK", 12], ["ST", 3], ["T", 15],
    ["TH", 3], ["V", 3], ["X", 18]
  ],

  // 4. When a SINGLE letter VOWEL is rolled, roll another
  //    1D6; on a result of 1, roll an additional VOWEL; if that
  //    is a single letter VOWEL, add it to make the first
  //    VOWEL/ a new DOUBLET, i.e. "AE", etc.
  extendSyllable: function(syllable, phoneme) {
    if (syllable === "V" && phoneme.length === 1 && roll1D() === 1) {
      var additional = selectByFreq(Languages.Gurvin.vowels);
      if (additional.length === 1) {
        return additional;
      }
    }
    return "";
  },

  // Simplification
  // 5. Do not permit THREE OR MORE VOWEL LETTERS in succession
  //    from an occurence of say, CV.VC, or CV.V.CVC, etc.
  reductionRules: [["([AEIOUY]{2})[AEIOUY]+", "$1"]]
};

// From http://traveller.mu.org/archive/languages/ithklur.txt
// By Leroy Guatney
Languages.Ithklur = {
  // Syllable determination
  basicSyllables: [["V", 6], ["VC", 12], ["CV", 18]],
  alternateSyllables: [["CV", 36]],

  nextSyllable: {
    "V": "alternateSyllables",
    "CV": "alternateSyllables",
    "VC": "alternateSyllables"
  },

  // Phoneme determination
  initialConsonants: [
    ["D", 12], ["F", 12], ["G", 6], ["GH", 6], ["H", 6], ["HZ", 6], ["J", 6], ["JJ", 6], ["JZ", 6],
    ["K", 9], ["KK", 5], ["KL", 5], ["KS", 5], ["KZ", 5], ["L", 7], ["LL", 3], ["M", 6], ["N", 6],
    ["Q", 9], ["R", 4], ["RR", 6], ["RS", 3], ["RZ", 3], ["S", 6], ["SS", 8], ["TH", 9], ["TR", 5],
    ["X", 13], ["XX", 12], ["Z", 6], ["ZZ", 6], ["'", 9]
  ],
  vowels: [
    ["A", 30], ["AA", 6], ["AE", 6], ["E", 24], ["EE", 6], ["I", 30], ["II", 15], ["O", 27],
    ["OU", 6], ["U", 24], ["UE", 12], ["UU", 10], ["Y", 5], ["YU", 3], ["YY", 3], ["*", 9]
  ],
  finalConsonants: [
    ["D", 15], ["F", 9], ["G", 6], ["GH", 12], ["H", 6], ["HZ", 6], ["J", 6], ["JJ", 3], ["JZ", 6],
    ["K", 12], ["KK", 9], ["KS", 9], ["KZ", 9], ["L", 8], ["LL", 4], ["M", 6], ["N", 6], ["Q", 9],
    ["R", 9], ["RR", 6], ["RS", 6], ["RZ", 6], ["SS", 12], ["TH", 6], ["X", 6], ["XX", 6],
    ["Z", 9], ["ZZ", 9]
  ],

  // Simplification
  // Rerite "*" ("glottal stop-tee") as 't
  reductionRules: [["\\*", "'T"]]
};

function roll1D() {
  return Math.floor(Math.random() * 6) + 1;
}

function tableLength(table) {
  var total = 0;
  for (var i = 0; i < table.length; ++i) {
    total += table[i][1];
  }
  return total;
}

function selectByFreq(table) {

  var total = tableLength(table);

  var sel = Math.floor(total * Math.random());

  for (var i = 0; i < table.length; ++i) {
    if (sel < table[i][1]) {
      return table[i][0];
    }
    sel -= table[i][1];
  }

  throw new Error("Internal error");
}

function pickAndFilter(table, previous, filter) {
  var value;
  do {
    value = selectByFreq(table);
  } while (previous && filter && !filter(previous, value));
  return value;
}

function generateWord(lang) {
  var word = "";
  var num_syllables = roll1D();
  var syllable;
  var phoneme;

  var syllableTable = lang.basicSyllables;

  for (var i = 0; i < num_syllables; ++i) {

    syllable = pickAndFilter(syllableTable, syllable, lang.filterSyllable);

    // If there are rules for what syllable table to use next:
    if (lang.nextSyllable) {
      syllableTable = lang[lang.nextSyllable[syllable]];
    }

    switch (syllable) {
    case "V":
      phoneme = pickAndFilter(lang.vowels, phoneme, lang.filterPhoneme);
      word += phoneme;
      break;
    case "CV":
      phoneme = pickAndFilter(lang.initialConsonants, phoneme, lang.filterPhoneme);
      word += phoneme;
      phoneme = pickAndFilter(lang.vowels, phoneme, lang.filterPhoneme);
      word += phoneme;
      break;
    case "VC":
      phoneme = pickAndFilter(lang.vowels, phoneme, lang.filterPhoneme);
      word += phoneme;
      phoneme = pickAndFilter(lang.finalConsonants, phoneme, lang.filterPhoneme);
      word += phoneme;
      break;
    case "CVC":
      phoneme = pickAndFilter(lang.initialConsonants, phoneme, lang.filterPhoneme);
      word += phoneme;
      phoneme = pickAndFilter(lang.vowels, phoneme, lang.filterPhoneme);
      word += phoneme;
      phoneme = pickAndFilter(lang.finalConsonants, phoneme, lang.filterPhoneme);
      word += phoneme;
      break;
    }

    if (lang.extendSyllable) {
      word += lang.extendSyllable(syllable, phoneme);
    }

    if (lang.terminatesWord && lang.terminatesWord(syllable)) {
      break;
    }
  }

  // If there are simplification rules
  if (lang.reductionRules) {
    var pattern, replacement;
    for (i = 0; i < lang.reductionRules.length; ++i) {
      pattern = lang.reductionRules[i][0];
      replacement = lang.reductionRules[i][1];

      word = word.replace(new RegExp(pattern, "ig"), replacement);
    }
  }

  word = word.toLowerCase();

  return word;
}
