<?php

namespace App\Util;

interface Observable
{
    function subscribe(callable $fn);
}

interface Store extends Observable
{
    function update(callable $fn);
    function value();
}
