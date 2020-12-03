<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Note;

class NotesController extends Controller
{
    public function index()
    {
        return Note::orderBy('id')->get();
    }

    public function store(Request $req)
    {
        $note = $req->input('note');
        Log::channel('stderr')->warning(json_encode($note));
        Note::create($note);
    }

    public function update(Request $req, $id)
    {
        Note::find($id)->update($req->input('note'));
    }

    public function destroy($id)
    {
        Note::destroy($id);
    }
}
