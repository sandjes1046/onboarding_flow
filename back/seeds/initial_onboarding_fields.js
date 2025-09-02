/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries in the admin table
  return knex('onboarding').del()
    .then(function () {
      // Inserts seed entries
      return knex('onboarding').insert([
        {type:'birthday',title:'Birthday',step:2},
        {type:'about_me',title:'About Me',step:2},
        {type:'address',title:'Adress',step:3},
      ]);
    });
};