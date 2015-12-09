FactoryGirl.define do
  factory :memo do
    trait :valid do
      title { SecureRandom.hex(4) }
      src { "h1 #{SecureRandom.hex(4)}" }
      html { SecureRandom.hex(4) }
      public true
    end
  end
end
