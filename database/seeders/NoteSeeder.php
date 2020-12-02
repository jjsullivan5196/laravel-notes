<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('notes')->insert(
            [
                'title' => 'non-travel',
                'stack' => 'holiday',
                'text' => 'Stay in boston',
                'done' => true
            ]
        );

        DB::table('notes')->insert([
            [
                'title' => 'Gifts',
                'stack' => 'holiday',
                'text' => 'Wrap presents'
            ],
            [
                'title' => 'Food',
                'stack' => 'chores',
                'text' => 'Turkey, pumpkin pie for dinner'
            ],
            [
                'title' => 'Today',
                'stack' => 'chores',
                'text' => 'Pickup drycleaning'
            ],
            [
                'title' => 'Paper pushing',
                'stack' => 'work',
                'text' => 'TPS Reports'
            ],
        ]);
    }
}
