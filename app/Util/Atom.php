<?php

namespace App\Util;

use \SplObjectStorage;
use App\Util\Store;

interface AppStorage extends Store {}

class Atom implements AppStorage
{
    private $watchers, $data;

    function __construct($data)
    {
        $this->watchers = new SplObjectStorage;
        $this->data = $data;
    }

    public function subscribe(callable $fn)
    {
        $this->watchers->attach($fn);

        return function () use ($fn) {
            $this->watchers->detach($fn);
        };
    }

    public function update(callable $fn)
    {
        $old = $this->data;
        $new = $this->data = $fn($old);

        foreach($this->watchers as $w)
        {
            $w($old, $new);
        }
    }

    public function value()
    {
        return $this->data;
    }
}
