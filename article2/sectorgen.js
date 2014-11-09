//
// Based on Traveller Sector Generator, from Challenge #25
// Translation to JavaScript, corrections per The Traveller Book,
// by Joshua Bell
//
// The Traveller game in all forms is owned by Far Future Enterprises.
// Copyright (C) 1977-2013 Far Future Enterprises.
//

function roll1D() {
    return Math.floor(Math.random() * 6) + 1;
}

function roll2D() {
    return roll1D() + roll1D();
}

function hex(n) {
    return "0123456789ABCDEFGHJKL".charAt(n);
}

function generateWorld(allegiance) {
    var b1, b2, dm;

    var world = {};

    // Allegiance
    world.al = allegiance;

    // Generate UPP
    world.st = "AAAABBCCDEEX".charAt(roll2D() - 1);

    world.si = roll2D() - 2;

    world.am = roll2D() - 7 + world.si;
    if (world.si < 0 || world.am < 0) { world.am = 0; }

    world.hy = roll2D() - 7 + world.si; // Matches Scouts, not Book 3
    if (world.si < 2) { world.hy = 0; }
    if (world.am < 2 || world.am > 9) { world.hy -= 4; } // Corrected line 2180
    if (world.hy < 0) { world.hy = 0; }
    if (world.hy > 10) { world.hy = 10; }

    world.po = roll2D() - 2;

    world.go = roll2D() - 7 + world.po;
    if (world.go < 0) { world.go = 0; }

    world.la = roll2D() - 7 + world.go;
    if (world.la < 0) { world.la = 0; }

    world.tl = 0;
    if (world.st == "A") { world.tl += 6; }
    if (world.st == "B") { world.tl += 4; }
    if (world.st == "C") { world.tl += 2; }
    if (world.st == "X") { world.tl -= 2; }
    if (world.si < 5) { world.tl -= 1; if (world.si < 2) { world.tl -= 1; } }
    if (world.am < 4) { world.tl += 1; }
    if (world.am > 9) { world.tl += 1; }
    if (world.hy > 8) { world.tl += 1; if (world.hy > 9) { world.tl += 1; } }
    if (world.po > 0 && world.po < 6) { world.tl += 1; }
    if (world.po > 8) { world.tl += 2; if (world.po > 9) { world.tl += 2; } }
    if (world.go == 0 || world.go == 5) { world.tl += 1; }
    if (world.go == 13) { world.tl -= 2; }
    if (world.tl < 0) { world.tl = 0; }

    // Generate Gas Giant
    world.gg = (roll2D() < 10);

    // Generate Travel Zones
    world.tz = 0;
    if (world.st == "X") { world.tz = 2; }
    if (world.tz == 0 && roll2D() > 10) { world.tz = 1; } // Corrected line 2520

    // Generate Bases
    b1 = false;
    if (world.st <= "B") // Corrected line 2530
    {
        b1 = (roll2D() > 7);
    }
    dm = 0;
    b2 = false;
    if (world.st == "A") { dm = -3; }
    if (world.st == "B") { dm = -2; }
    if (world.st == "C") { dm = -1; } // Corrected line 2590
    if (world.st <= "D") {
        b2 = ((roll2D() + dm) > 6); // Corrected line 2610
    }
    world.b = " ";
    if (b1 && !b2) { world.b = "N"; }
    if (!b1 && b2) { world.b = "S"; }
    if (b1 && b2) { world.b = "A"; }

    // Trade Classifications
    world.tc = "";
    if ((world.am > 3 && world.am < 10) && (world.hy > 3 && world.hy < 9) && (world.po > 4 && world.po < 8)) { world.tc += "Ag "; }
    if (world.am < 4 && world.hy < 4 && world.po > 5) { world.tc += "Na "; }
    if ((world.am < 3 || world.am == 4 || world.am == 7 || world.am == 9) && world.po > 8) { world.tc += "In "; }
    if (world.po < 7) { world.tc += "Ni "; }
    if ((world.am == 6 || world.am == 8) && (world.po > 5 && world.po < 9) && (world.go > 3 && world.go < 10)) { world.tc += "Ri "; } // Corrected line 2760
    if ((world.am > 1 && world.am < 6) && world.hy < 4) { world.tc += "Po "; } // Corrected line 2770
    if (world.hy == 10) { world.tc += "Wa "; }
    if (world.hy == 0 && world.am > 1) { world.tc += "De "; }
    if (world.si == 0) { world.tc += "As "; }
    if (world.am == 0 && world.si > 0) { world.tc += "Va "; }
    if (world.po == 0 && world.go == 0 && world.la == 0) { world.tc += "Ba "; }

    return world;
}

function makeUWP(x, y, world) {

    function ljust(str, size, fill) {
        while (str.length < size) {
            str = str + fill;
        }
        return str;
    }

    function rjust(str, size, fill) {
        while (str.length < size) {
            str = fill + str;
        }
        return str;
    }

    // Create World Data String
    var uwp = "";

    uwp += rjust(x.toString(), 2, "0");
    uwp += rjust(y.toString(), 2, "0");
    uwp += " ";
    uwp += world.st + hex(world.si) + hex(world.am) + hex(world.hy) + hex(world.po) + hex(world.go) + hex(world.la) + "-" + hex(world.tl) + " " + world.b + " ";
    uwp += ljust(world.tc, 15, " ");
    uwp += world.al + " ";
    uwp += " AR".charAt(world.tz);
    uwp += (world.gg) ? "G" : " ";

    return uwp;
}

function generateSector() {
    var x, y;
    var world;

    var sector = [];

    for (x = 1; x <= 32; ++x) {
        for (y = 1; y <= 40; ++y) {
            // World Occurance
            if (roll1D() < 4) {
                continue;
            }

            world = generateWorld("Im");

            sector.push(makeUWP(x, y, world));
        }
    }

    return sector;
}
