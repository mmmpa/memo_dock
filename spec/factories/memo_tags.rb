FactoryGirl.define do
  factory :memo_tag do
    trait :valid do
      memo { create(:memo, :valid) }
      tag { create(:tag, :valid) }
    end
  end
end
