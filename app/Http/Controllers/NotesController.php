<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Util\AppStorage;

class NotesController extends Controller
{
    function __construct(AppStorage $store)
    {
        $this->store = $store;
    }

    public function index()
    {
        return $this->store->value()['notes'];
    }

    public function store(Request $req)
    {
        $note = $req->input('note');

        $this->store->update(function ($data) use ($note) {
            $notes = array_merge($data['notes'], $note);
            return array_merge($data, [ 'notes' => $notes ]);
        });

        return $this->index();
    }

    public function destroy($id)
    {
        $this->store->update(function ($data) use ($id) {
            unset($data['notes'][$id]);
            return $data;
        });

        return $this->index();
    }
}
