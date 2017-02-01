require "exporter"

namespace :exporter do
  task :proposals => :environment do
    data = Proposal.unscoped.includes(:answer).find_each.map do |proposal|
      {
        id: proposal.id,
        body: proposal.summary,
        title: proposal.title,
        author_id: proposal.author_id,
        created_at: proposal.created_at,
        updated_at: proposal.updated_at,
        category_id: proposal.category_id,
        subcategory_id: proposal.subcategory_id,
        scope_id: proposal.district,
        process_id: proposal.participatory_process_id,
        state: proposal.answer.try(:status),
        answer: proposal.answer.try(:message),
        answered_at: proposal.answer.try(:created_at),

        extra: {
          official: proposal.official,
          slug: proposal.slug,
          from_meeting: proposal.from_meeting,
          external_url: proposal.external_url,
          flags_count: proposal.flags_count,
          ignored_flag_at: proposal.ignored_flag_at,
          responsible_name: proposal.responsible_name,
        }
      }
    end

    puts "Exported #{data.length} proposals"

    Exporter.write_json("proposals", data)
  end
end
