set -x
set -e
trap 'catch' ERR
catch() {
  dfx identity use default
  echo "FAIL"
  exit 1
}

dfx identity use default
export PRINCIPAL=$(dfx identity get-principal)
dfx canister call amplify_sc_rust_backend clear

# Create a new token
#dfx identity new minter
dfx identity use minter
export MINTER=$(dfx identity get-principal)
export TOKEN_NAME="My Token"
export TOKEN_SYMBOL="XMTK"
dfx identity use default
export DEFAULT=$(dfx identity get-principal)
export PRE_MINTED_TOKENS=10_000_000_000
export TRANSFER_FEE=0
#dfx identity new archive_controller
dfx identity use archive_controller
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)
export TRIGGER_THRESHOLD=2000
export NUM_OF_BLOCK_TO_ARCHIVE=1000
export CYCLE_FOR_ARCHIVE_CREATION=10000000000000
export FEATURE_FLAGS=false

# Get the token ID (assuming the create_token function returns the token's principal)
export TOKEN_ID="mxzaz-hqaaa-aaaar-qaada-cai"
dfx identity use default

# Whitelist the token
dfx canister call amplify_sc_rust_backend whitelist_token '(principal '\"$TOKEN_ID\"')'

# Negative Test: Try creating a campaign with a non-whitelisted token
#dfx canister call amplify_sc_rust_backend create_campaign '(record {
#    "reward_token" = principal '\"$TOKEN_ID\"';
#    reward = record { "e8s" = 1000000 };
#    winners = 5;
#    tweet_id = "hello";
#    campaign_id = 5;
#    project_name = "Test Project";
#    starts_at = 1634840400;
#    ends_at = 1635445200;
#    participants = vec {};
#    selected_winners = vec {};
#    user_id = principal '\"$PRINCIPAL\"'
#})' && echo "Expected failure but succeeded" && exit 1

# Create a campaign with the whitelisted token
dfx canister call amplify_sc_rust_backend create_campaign '(record {
                                                                        "reward_token" = principal '\"$TOKEN_ID\"';
                                                                            reward = record { "e8s" = 1000000 };
                                                                            winners = 5;
                                                                            tweet_id = "bla";
                                                                            campaign_id = 5;
                                                                            project_name = "Test Project";
                                                                            starts_at = 1634840400;
                                                                            ends_at = 1635445200;
                                                                            user_id = principal '\"$PRINCIPAL\"'
                                                                    }
)'

# Participate in the campaign
dfx canister call amplify_sc_rust_backend participate_in_campaign '(4)'

# Negative Test: Try participating again in the same campaign
#dfx canister call amplify_sc_rust_backend participate_in_campaign '(1)' && echo "Expected failure but succeeded" && exit 1

# Check if the current user is a winner
dfx canister call amplify_sc_rust_backend have_i_participated '(4)'
dfx canister call amplify_sc_rust_backend am_i_a_winner '(4)'
dfx canister call amplify_sc_rust_backend paginate_campaigns '(record {page_number = 1; page_size = 4})'

# Validation: This is a basic check. You might want to add more detailed checks based on your requirements.
# Check if the campaign exists
#dfx canister call amplify_sc_rust_backend get_campaign '(1)'
# Check if the user has participated
#dfx canister call amplify_sc_rust_backend has_participated '(1, principal '\"$PRINCIPAL\"')'
# Check if the user is a winner (this might not always be true, depending on your winner selection logic)
#dfx canister call amplify_sc_rust_backend is_winner '(1, principal '\"$PRINCIPAL\"')'

echo "PASS"
