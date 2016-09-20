# coding: utf-8
require 'rails_helper'

feature 'Admin participatory processes' do
  background do
    admin = create(:administrator)
    login_as(admin)
  end

  scenario "Can create new participatory processes", :js do
    visit admin_participatory_processes_path

    click_link "Create participatory process"

    fill_in "participatory_process_name", with: "pam"

    fill_in "participatory_process_admin_name", with: "David"
    fill_in "participatory_process_admin_email", with: "david.morcillo@codegram.com"

    fill_in "participatory_process_title_ca", with: "PAM (ca)"
    fill_in "participatory_process_title_es", with: "PAM (es)"
    fill_in "participatory_process_title_en", with: "PAM (en)"

    fill_in "participatory_process_subtitle_ca", with: "PAM subtitle (ca)"
    fill_in "participatory_process_subtitle_es", with: "PAM subtitle (es)"
    fill_in "participatory_process_subtitle_en", with: "PAM subtitle (en)"

    fill_in "participatory_process_manager_group", with: "Ajuntament"
    fill_in "participatory_process_areas", with: "Consell Municipal"

    fill_in_editor "participatory_process_summary_ca", with: "Breu descripcio del PAM"
    fill_in_editor "participatory_process_summary_es", with: "Breve descripción del PAM"
    fill_in_editor "participatory_process_summary_en", with: "PAM's brief description'"

    fill_in_editor "participatory_process_description_ca", with: "Descripcio del PAM"
    fill_in_editor "participatory_process_description_es", with: "Descripción del PAM"
    fill_in_editor "participatory_process_description_en", with: "PAM's description'"

    fill_in "participatory_process_audience", with: "Tota la població."
    fill_in "participatory_process_citizenship_scope", with: "Només poden opinar."

    click_button "Create participatory process"

    expect(page).to have_content "ParticipatoryProcess created successfully."
    expect(page).to have_content "pam"
    expect(page).to have_content "/pam"
  end 
end