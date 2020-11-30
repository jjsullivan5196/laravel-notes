<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Util\AppStorage;

class StackController extends Controller
{
    function __construct(AppStorage $store)
    {
        $this->store = $store;
    }

    public function index()
    {
        return $this->store->value()['stacks'];
    }

    public function store(Request $req)
    {
        $stack = $req->input('stack');

        $this->store->update(function ($data) use ($stack) {
            $stacks = array_merge($data['stacks'], $stack);
            return array_merge($data, [ 'stacks' => $stacks ]);
        });

        return $this->index();
    }

    public function destroy($id)
    {
        $this->store->update(function ($data) use ($id) {
            unset($data['stacks'][$id]);
            return $data;
        });

        return $this->index();
    }
}
