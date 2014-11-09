Using Your Model/2 bis – Revisited, Part 2
==========================================
by Joshua Bell

> _"A simple computer program could use this information to produce Aslan words..."_
> – Alien Module 1: Aslan

Welcome back! This is Part 2 of a series of articles intended to
(re)introduce players to the pleasure of creating and sharing useful
software tools, much as the creators of **_Traveller_** did while inventing
the game. We’ve replaced floppy disks and BASIC with the Internet and
JavaScript, but the fun is still there. It’s never been easier, let’s
dive in.

Last time, I promised to revisit the basic Traveller Sector Generator
from _Challenge #25_. I remember dutifully entering that listing into my
Apple... and then spending hours trying to track down the inevitable
typos! This time around we’ll skip most of the typing, thanks to the
wonders of the Internet. The sample code for this article can be
downloaded from: http://travellermap.com/model2/

The focus of this article will be how to understand, adapt, modify,
and combine existing scripts to do new things.


Word Generation
---------------

The creators of Traveller were enthusiastic about creating algorithms
for many tasks. A prime example of this was the word generation rules
that were printed in the Classic Traveller Alien Modules. The
algorithm for each language followed this pattern:

* Determine the number of syllables in a word (1D)
* For each syllable, determine the type - Vowel (V), Consonant-Vowel
  (CV), Vowel-Consonant (VC) or Consonant-Vowel-Consonant (CVC). Make
  two 1D rolls to look up the type from a 6x6 table. The table to use
  depends on the previous syllable.
* For each consonant or vowel, roll 1D to pick from one of six tables,
  then roll 1D twice more to pick the phoneme from the resulting 6x6
  table.

Each language also had one or two specific rules to filter these
choices, such as _"a single letter vowel can never be followed directly
by the same single letter vowel."_ The straightforward nature of the
algorithm meant that it was easily implemented on personal computers
of the day using built-in languages like BASIC - GDW even sold _WordGen_
for the Apple II as a play aid. But is also an excellent candidate for
beginning programmers to implement today, using a Web browser, HTML
and JavaScript.

In the previous article, all of the program logic and display were
present in one file. This time, the reusable logic is stored in a
JavaScript file ([wordgen.js](wordgen.js)) and the page-specific
display code is stored in the HTML file
([wordgen.html](wordgen.html)). Let’s look at the JavaScript file
first.

To keep things tidy, all of the program data is held inside a
`Languages` object. An object, or collection of named values, can be
created and populated using the notation `var myobject = { key1:
member1, key2: member2, ... };` or by creating an empty object `var
myobject = {};` and then adding to it: `myobject.key = member;` Keys are
strings, and members can be of any data type – numbers,
strings, true or false, arrays (like lists) or even other objects. You
can get data out of an object by writing `myobject["key"]` or
`myobject.key` – the latter form is typically used if you know the key
name when writing the code.

The syllable and letter frequencies for each language are stored in
objects as well, added to the `Languages` object. Each language object
has members named `basicSyllables`, `alternateSyllables`,
`initialConsonants`, `vowels`, and `finalConsonants`. The value for each of
these members is an array of pairs of symbol and frequency. A special
member called `nextSyllable` is an object which "maps" from the name of
the last syllable type to the name of the next syllable table to use.
Since each language has slightly different rules, some languages have
additional members. For example, a member called `reductionRules` allows
sequences such as "SHSH" to be reduced to "SH" in Vilani and the
unpronounceable "NCHCHT" to "NCH" in Zhodani.

The rest of the sample is the code to operate on these functions. It
starts off with a basic `roll1D()` utility function, then a generic
`selectByFreq()` function that takes an array of pairs and selects a
random member. The last utility function `pickAndFilter()` handles
special rules found in languages that forbid certain syllables or
phonemes from following each other – it "re-rolls" `selectByFreq()`
until it gets an acceptable answer. The function must be given a
filter function to use, which comes from the language definition
itself.

The final function is `generateWord()` which implements the overall
algorithm. It takes a language object, rolls 1D to get the syllables,
determines each syllable, and picks the phonemes, implementing
filtering where required by each language. One common JavaScript
pattern that you will see here is `if( lang.someFunction &&
lang.someFunction(…) ) { ... }` – this does nothing if a given language
doesn’t have `someFunction` defined, and allows language definitions to
be as compact as possible.

The HTML file includes the JavaScript file with the line:

```html
 <script src="wordgen.js"></script>
```

This is followed by the script which generates five random words in
each language and adds them to the page. Press the "Refresh" button in
your Web browser to keep making new words.


Sector Generation
-----------------

Another frequently printed and updated algorithm was world generation,
originally described in Classic Traveller _Book 3: Worlds and
Adventures_, updated in _Book 6: Scouts_, and tweaked and modified by
practically every Traveller edition since. Marc Miller wrote a basic
sector generator printed in _Challenge #25_, and a much more advanced
and interactive generator was published in the next issue that handled
varying stellar density and allegiances across a sector, and even
Zhodani relay station placement. We’ll stick to adapting the simpler
sector generator for this article. Once again, the reusable logic is
stored in a JavaScript file ([sectorgen.js](sectorgen.js)) and the page-specific
display code is stored in the HTML file ([sectorgen.html](sectorgen.html)).

Basic world generation is much more straightforward than word
generation. Each world starts off as an empty object. Then each digit
of the UWP is determined through a combination of die rolls and
modifiers based on previous results, and assigned to the world object.
Finally, trade codes are determined. This is done in the
`generateWorld()` function, which closely follows the Applesoft BASIC
code presented in _Challenge #25_, with a few bug fixes introduced to
and changes to conform to _Book 6_.

A `makeUWP()` function is used to convert a world object into a UWP row
that might be found printed in a sector data listing, using
Traveller's special form of "hexadecimal". This is unfortunately just
as inelegant in JavaScript as in BASIC; unlike practically every other
programming language developed in the last 30 years, neither
JavaScript nor BASIC has good string formatting utilities built in!

Finally, the `generateSector()` function is used to fill a whole
sector’s worth of parsecs with worlds. The HTML page simply includes
the JavaScript file, calls this function, and adds the results to the
page – a new sector each time the page is loaded!


Using Your Model/2 Blender
--------------------------

Now that we have a way to generate both words and worlds, let’s put
them together.

First, modify the source to the sector generator HTML page to include
the word generator script – add the first script tag above the second
near the top of the file:

```html
 <script src="wordgen.js"></script>
 <script src="sectorgen.js"></script>
```

Then, modify the sector generator script to call into the word
generator script to create a name for each world. Near the top of the
file, add a function to capitalize the names:

```js
function capitalize(word) {
 return word.replace(/^\w/,
   function(a) { return a.toUpperCase();
  });
}
```

Just after the world object is created in `generateWorld()`, generate the name:

```js
 var world = {};
 world.name = capitalize(generateWord(Languages.Vilani)); // Add this line
```

Finally, change the UWP generation script to include the name:

```js
 var uwp = "";
 uwp += ljust(world.name, 22, " "); // Add this line
```

Now, refresh the page and make sure it works. (The
[sectorgen2.js](sectorgen2.js) and [sectorgen2.html](sectorgen2.html)
files are the "after" versions, if you want to verify your changes.)
Since it is only the basic sector generator, all worlds are generated
with Imperial allegiance and therefore Vilani names are used. A more
advanced generator would allow interactive specifications of
allegiances, implement allegiance-specific world generation rules,
include use a map from allegiances to languages, and use appropriate
languages to generate the names for each world.
