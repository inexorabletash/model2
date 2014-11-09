Using Your Model 2 Bis, Revisited
=================================
By Joshua Bell

> "Traveller has always been an easy game to mate to a computer."

So begins Marc W. Miller's first entry in a short-lived column in _The
Journal of the Travellers' Aid Society_ and _Challenge_ magazines, issues
24, 25 and 26.

A Bit of History
----------------

**_Traveller_** emerged on the scene in 1977 at the same time as the
personal computer, and this revolutionary new tool was instrumental in
the creation of the **_Traveller_** universe. Software was used to generate
the sector data for Atlas of the Imperium and other supplements such
as _1001 Characters and Veterans_. GDW even dabbled in selling play aids
such as _Beastiary_ and _WordGen_. As noted on the last page of Book 7:
_"As the Merchant Prince trade system was created and tested, extensive
use of a computer simulation helped the designer analyze and
understand various aspects of the system"_ and this simulation was
released in an interactive form as _Trader_. It is clear that without
personal computers, the evolution of **_Traveller_** would have been quite
different.

Typical of the personal computers at the time was the Apple II, and
this was the platform used by Miller. While primitive by today's
standards, the Apple II was programmable out-of-the box in a
straightforward way using a built-in programming language known as
Applesoft BASIC. This meant that programs could be listed in magazines
and typed in by hobbyists, who could learn as they typed and tinker
with the results. In contrast, software development today often
involves a whole series of complex and often expensive tools. Asking
_"how do I get started in programming?"_ often leads to questions such
as _"what language – C++ or Java?"_ or _"what platform – Windows or
Macintosh?"_

Is there a simpler way that hearkens back to the "good old days?"

A Different Approach
--------------------

Every contemporary personal computer system comes with a Web browser,
which provides a nearly uniform environment for content that adheres
to certain Internet standards, such as HTML, CSS, and JavaScript.
Writing programs which run within a Web browser is nearly as simple
and straightforward as in the days of the Apple II, and in many ways
far more convenient.

* Start a simple text editor
  * Windows: Start > All Programs > Accessories > Notepad
  * Macintosh: Applications > TextEdit, then select Format > Make Plain Text
* Type in (or copy/paste) the code from Listing 1
* Save the file as `roll.html`
* Double-click the file to open it in your default Web browser

> NOTE: On Windows with Internet Explorer, you may see an alert that the
> page has been blocked from running scripts. This is an extra degree of
> safety designed to prevent random pages you save from the Internet
> from being run as full applications from your hard drive and doing bad
> things. Since you know you created the page, you can select Allow
> Blocked Content to continue.


Listing 1:
```html
<!DOCTYPE html>
<title>Roll 1D</title> 
<script type="text/javascript"> 
  function myprogram() {
    var output = document.getElementById("output_element"); 
    var result = Math.floor( Math.random() * 6 ) + 1;
    output.innerHTML += "Die Roll: " + result; 
  }
  window.onload = myprogram; 
</script> 
<div id="output_element"></div> 
```

This is an empty HTML document that provides a blank slate for the
script to write upon. The script itself can be broken down into two
pieces – a function, which is a set of instructions, and some glue
which says _"when the browser is done loading the page, run my
function."_ This function, called `myprogram`, also has two parts. The
first finds the blank slate, and the second adds something to it. This
program provides a very basic Traveller utility – every time you load
the page, it will compute a new 1D roll result.

This simple example has captured many of the aspects that made writing
programs for the Apple II so easy: it uses the tools already found on
your computer to create and run the program; the program listing is
easily readable and modifiable; the program is easily saved and can be
re-used again and again. A big advantage of computers today is that
the program (in the form of an HTML file) can be easily shared; by
publishing the file to the Web, anyone can access it at any time, and
the program can run on any computer with a Web browser.


Traveller Utility – Temperature Calculation Revisited
-----------------------------------------------------

To really kick off this series, let's revisit the very first example
by Marc W. Miller from _JTAS #24_ – a utility to compute the average
local temperature of a world. Unlike the previous example, this one
requires input from the user:

Listing 2:

```html
<!DOCTYPE html>
<title>Computing Local Temperature for TRAVELLER Worlds</title>
<script type="text/javascript">

function run() {
	var k = 374.025;

	var distance         = parseFloat( document.getElementById( "distance"         ).value );
	var albedo           = parseFloat( document.getElementById( "albedo"           ).value );
	var luminosity       = parseFloat( document.getElementById( "luminosity"       ).value );
	var greenhouseEffect = parseFloat( document.getElementById( "greenhouseEffect" ).value );

	var g = greenhouseEffect + 1;
	var t = k * ( 1 - albedo ) * ( Math.sqrt( Math.sqrt( luminosity ) ) / Math.sqrt( distance ) );

	var output = document.getElementById( "output" );
	output.innerHTML = "";
	output.innerHTML += "Local Temperature = " + t           + " K<br>"; 
	output.innerHTML += "Local Temperature = " + (t-273)     + " C<br>"; 
	output.innerHTML += "Local Temperature = " + (t*g)       + " K with greenhouse effect<br>"; 
	output.innerHTML += "Local Temperature = " + ((t*g)-273) + " C with greenhouse effect<br>"; 
}
</script>

<form action="" onsubmit="run(); return false;">
  <div>Distance (in AU) <input id="distance"></div>
  <div>Albedo (Earth=0.3) <input id="albedo"></div>
  <div>Luminosity (Sol=1) <input id="luminosity"></div>
  <div>Greenhouse Effect (Earth=0.1) <input id="greenhouseEffect"></div>
  <div><input type="submit" value="Compute"></div>
</form>
<div id="output"></div>
```

The next article in this series will revisit the basic Traveller
Sector Generator from Challenge #25.
